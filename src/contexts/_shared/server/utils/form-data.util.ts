import Busboy from 'busboy';

/**************************************************************************************
 ***** Función auxiliar para leer un ReadableStream y convertirlo en un Buffer *****
 **************************************************************************************/
/**
 * Lee un stream de datos (como el cuerpo de una petición) y lo concatena en un único Buffer.
 * Esto es necesario para poder procesar el cuerpo de la petición en su totalidad.
 */
async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
    const chunks: Buffer[] = [];
    const reader = stream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        if (value) {
            chunks.push(Buffer.from(value));
        }
    }
    return Buffer.concat(chunks);
}

/***************************************************************************************************
 ***** Parseo de datos de formulario multipart/form-data con manejo de serialización Firebase *****
 ***************************************************************************************************/
/**
 * Parsea una petición `multipart/form-data`. Se utiliza `Busboy` en lugar del `request.formData()` nativo
 * porque las Cloud Functions de Firebase pueden interceptar y serializar el cuerpo de la petición
 * en un formato JSON antes de que llegue a nuestro código. Esta función maneja esa posible
 * serialización para asegurar que el archivo se procese correctamente.
 * 
 * @param request La petición entrante.
 * @returns Una promesa que resuelve con los campos de texto, el contenido del archivo como Buffer y su tipo MIME.
 */
export async function parseMultipartFormData(request: Request): Promise<{ fields: Record<string, string>, fileContent: Buffer, fileMimeType: string }> {
    return new Promise(async (resolve, reject) => {

        /*************************************************
         ***** Validar y leer el cuerpo de la petición *****
         *************************************************/
        if (!request.body) {
            console.error('[DEBUG] Error: request.body es nulo o no existe.');
            return reject(new Error("Request body is empty."));
        }

        // Leemos todo el cuerpo de la petición en un buffer. Esto es crucial para poder
        // inspeccionarlo y, si es necesario, deserializarlo antes de pasarlo a Busboy.
        const requestBuffer = await streamToBuffer(request.body).catch(reject);
        if (!requestBuffer) return; // En caso de error en streamToBuffer

        let rawBodyBuffer = requestBuffer;

        /********************************************************************************
         ***** Deserialización del Buffer si Firebase lo ha serializado en JSON *****
         ********************************************************************************/
        // Este bloque es la solución al problema de serialización de Firebase Functions.
        // Intenta interpretar el buffer como JSON. Si tiene la estructura {type: 'Buffer', data: [...]},
        // lo convierte de nuevo a un Buffer nativo que Busboy pueda entender.
        try {
            // Intenta parsear el buffer como una cadena JSON
            const potentialJson = requestBuffer.toString('utf8');
            const parsed = JSON.parse(potentialJson);

            // Verificar si es el formato de Buffer serializado de Node/Firebase
            if (parsed && parsed.type === 'Buffer' && Array.isArray(parsed.data)) {
                //console.log('[DEBUG] Detectado cuerpo de petición serializado en JSON por Firebase. Deserializando...');
                rawBodyBuffer = Buffer.from(parsed.data);
                
                // Opcional: Re-log el tamaño real ahora
                //const contentLength = request.headers.get('content-length') || 'N/A';
                //console.log(`[DEBUG] Tamaño RAW recuperado: ${rawBodyBuffer.length} bytes. Content-Length original: ${contentLength} bytes.`);
            }
        } catch (e) {
            // No era JSON válido, asumimos que es el buffer RAW original
            // console.log('[DEBUG] El cuerpo no es un Buffer serializado JSON. Usando RAW Buffer directamente.');
        }
        
        /****************************************************************
         ***** Inicialización de Busboy para parsear el formulario *****
         ****************************************************************/
        // Se inicializa Busboy con las cabeceras de la petición para que pueda interpretar el contenido.
        const busboy = Busboy({ headers: Object.fromEntries(request.headers.entries()) });
        const fields: Record<string, string> = {};
        let fileContent: Buffer | null = null;
        let fileMimeType: string = '';

        busboy.on('field', (name, val) => {
            fields[name] = val;
        });

        // El evento 'file' se dispara cuando Busboy encuentra un campo de archivo.
        // Leemos el stream del archivo y lo acumulamos en `fileContent`.
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

        // El evento 'finish' se dispara cuando Busboy ha terminado de procesar todo el cuerpo.
        // En este punto, resolvemos la promesa con los datos recolectados.
        busboy.on('finish', () => {
            if (!fileContent) {
                return reject(new Error("No file content found in form data."));
            }
            resolve({ fields, fileContent, fileMimeType });
        });

        busboy.on('error', (err) => {
            reject(err);
        });

        /****************************************************************
         ***** Ejecución del parseo escribiendo el buffer en Busboy *****
         ****************************************************************/
        // Finalmente, escribimos el buffer (ya sea el original o el deserializado) en Busboy
        // para que comience el proceso de parseo.
        busboy.end(rawBodyBuffer);
    });
}