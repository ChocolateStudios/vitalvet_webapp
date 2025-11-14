import type { APIRoute } from 'astro';
import Busboy from 'busboy';
import { SaveFileResource } from '@/contexts/files/server/interfaces/api/resources/save-file.resource';
import { uploadFile } from '@/contexts/files/server/application/usecases/upload-file.usecase';
import { getStreamFile } from '@/contexts/files/server/application/usecases/get-stream-file.usecase';
import { PET_STORAGE_ROUTE } from '@/contexts/files/server/infrastructure/repositories/file.repository';
import { Readable } from 'node:stream';

export const prerender = false;


// Función auxiliar para leer un ReadableStream y convertirlo en un solo Buffer/Uint8Array
async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
    const chunks: Buffer[] = [];
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        console.log('[DEBUG] Seguimos en while True');
        if (done) {
            console.log('[DEBUG] Se terminó el while True. Vencimos Stark');
            break;
        }
        if (value) {
            chunks.push(Buffer.from(value));
        }
    }
    return Buffer.concat(chunks);
}

async function parseMultipartFormData(request: Request): Promise<{ fields: Record<string, string>, fileContent: Buffer, fileMimeType: string }> {
    return new Promise(async (resolve, reject) => { // Marca la función como async para usar await streamToBuffer
        console.log('[DEBUG] Iniciando parseMultipartFormData...');

        if (!request.body) {
            console.error('[DEBUG] Error: request.body es nulo o no existe.');
            return reject(new Error("Request body is empty."));
        }

        // Leer todo el cuerpo de la petición en un buffer primero
        console.log('[DEBUG] Leyendo el cuerpo de la petición en un buffer completo...');
        const requestBuffer = await streamToBuffer(request.body).catch(reject);
        if (!requestBuffer) return; // En caso de error en streamToBuffer

        console.log(`[DEBUG] Tamaño del requestBuffer: ${requestBuffer.length} bytes. Content-Length header: ${request.headers.get('content-length')} bytes.`);

        // Mostrar los primeros 50 y últimos 50 bytes como texto (puede que no sea legible)
        const start = requestBuffer.slice(0, 50).toString('utf8');
        const end = requestBuffer.slice(-50).toString('utf8');

        console.log(`[DEBUG] Primeros bytes: ${start.replace(/\n/g, '\\n')}`);
        console.log(`[DEBUG] Últimos bytes: ${end.replace(/\n/g, '\\n')}`);

        let rawBodyBuffer = requestBuffer;

        // --- SOLUCIÓN: Intentar deserializar si Firebase lo envolvió en JSON ---
        try {
            // Intenta parsear el buffer como una cadena JSON
            const potentialJson = requestBuffer.toString('utf8');
            const parsed = JSON.parse(potentialJson);

            // Verificar si es el formato de Buffer serializado de Node/Firebase
            if (parsed && parsed.type === 'Buffer' && Array.isArray(parsed.data)) {
                console.log('[DEBUG] Detectado cuerpo de petición serializado en JSON por Firebase. Deserializando...');
                rawBodyBuffer = Buffer.from(parsed.data);
                
                // Opcional: Re-log el tamaño real ahora
                const contentLength = request.headers.get('content-length') || 'N/A';
                console.log(`[DEBUG] Tamaño RAW recuperado: ${rawBodyBuffer.length} bytes. Content-Length original: ${contentLength} bytes.`);
            }
        } catch (e) {
            // No era JSON válido, asumimos que es el buffer RAW original
            console.log('[DEBUG] El cuerpo no es un Buffer serializado JSON. Usando RAW Buffer directamente.');
        }
        // --- FIN SOLUCIÓN --
        

        const busboy = Busboy({ headers: Object.fromEntries(request.headers.entries()) });
        const fields: Record<string, string> = {};
        let fileContent: Buffer | null = null;
        let fileMimeType: string = '';

        busboy.on('field', (name, val) => {
            fields[name] = val;
        });

        busboy.on('file', (name, file, info) => {
            const { mimeType } = info;
            fileMimeType = mimeType;
            const chunks: Buffer[] = [];
            file.on('data', (chunk) => {
                chunks.push(chunk);
            });
            file.on('end', () => {
                fileContent = Buffer.concat(chunks);
            });
        });

        busboy.on('finish', () => {
            console.log('[DEBUG] Busboy finalizó el parseo del formulario.');
            if (!fileContent) {
                return reject(new Error("No file content found in form data."));
            }
            resolve({ fields, fileContent, fileMimeType });
        });

        busboy.on('error', (err) => {
            console.error('[DEBUG] Error en Busboy:', err);
            reject(err);
        });

        // Escribir el buffer completo a Busboy de una sola vez
        console.log('[DEBUG] Escribiendo el buffer completo a Busboy.');
        // busboy.end(requestBuffer); // Pasar el buffer completo aquí
        busboy.end(rawBodyBuffer);
    });
}

export const POST: APIRoute = async ({ request, params }) => {
    console.log(`[DEBUG_INSPECTOR] request.bodyUsed: ${request.bodyUsed}`);
    console.log(`[DEBUG_INSPECTOR] request.headers.get('content-length'): ${request.headers.get('content-length')}`);

    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    
    try {
        const { fields, fileContent: fileContent, fileMimeType } = await parseMultipartFormData(request);
        console.log('A CONTINUACION REQUEST')
        console.log(fields.filename)
        console.log(fields.extension)
        console.log(fileMimeType)
        // const formData = await request.formData();

        // const fileContent = formData.get("file") as globalThis.File | null;
        if (!fileContent) {
            return new Response(JSON.stringify({ message: "File not found in form data" }), { status: 400 });
        }

        const fileName = 'profilePhoto';
        // const extension = formData.get("extension") as string;
        const extension = fields.extension as string;
        const contentType = fileMimeType;
        const size = fields.size as string;
        // const contentType = formData.get("contentType") as string;
        // const size = formData.get("size") as string;
        const storagePath = `${PET_STORAGE_ROUTE}/${petId}`;

        const resource = new SaveFileResource(fileContent, fileName, extension, contentType, Number(size), storagePath);

        const result = await uploadFile(resource);

        if (result.success) {
            return new Response(JSON.stringify(result.data), { 
                status: 201, 
                headers: { 'Content-Type': 'application/json' } 
            });
        } else {
            return new Response(JSON.stringify({ message: result.errorMessage }), { status: 500 });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const GET: APIRoute = async ({ params }) => {
    const { petId } = params;
    if (!petId) {
        return new Response('Pet ID is required', { status: 400 });
    }

    try {
        const result = await getStreamFile(`${PET_STORAGE_ROUTE}/${petId}/profilePhoto`, 'src/assets/petProfilePhoto.png');

        if (result.success) {
            return new Response(result.data.stream, {
                status: 200,
                headers: {
                    'Content-Type': result.data.metadata.contentType || 'application/octet-stream',
                    'Cache-Control': 'public, max-age=31536000, immutable'
                }
            });
        } else {
            return new Response(JSON.stringify({ message: result.errorMessage }), { status: 500 });
        }

    } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
            return new Response('Image not found', { status: 404 });
        }
        const errorMessage = error.message || 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: 'Error downloading image', error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};