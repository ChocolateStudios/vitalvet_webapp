import type { APIRoute } from 'astro';
import { SaveFileResource } from '@/contexts/files/server/interfaces/api/resources/save-file.resource';
import { uploadFile } from '@/contexts/files/server/application/usecases/upload-file.usecase';
import { getStreamFile } from '@/contexts/files/server/application/usecases/get-stream-file.usecase';
import { BATH_STORAGE_ROUTE } from '@/contexts/files/server/infrastructure/repositories/file.repository';

export const prerender = false;

export const POST: APIRoute = async ({ request, params }) => {
    const { petId, bathId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    if (!bathId) {
        return new Response(JSON.stringify({ message: 'Medical Appointment ID is required' }), { status: 400 });
    }
    
    try {
        const formData = await request.formData();

        const fileContent = formData.get("file") as globalThis.File | null;
        if (!fileContent) {
            return new Response(JSON.stringify({ message: "File not found in form data" }), { status: 400 });
        }

        const fileName = formData.get("filename") as string;
        const extension = formData.get("extension") as string;
        const contentType = formData.get("contentType") as string;
        const size = formData.get("size") as string;
        const storagePath = `${BATH_STORAGE_ROUTE(petId)}/${bathId}/images`;
        
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
    const { petId, bathId } = params;
    if (!petId) {
        return new Response('Pet ID is required', { status: 400 });
    }
    if (!bathId) {
        return new Response(JSON.stringify({ message: 'Medical Appointment ID is required' }), { status: 400 });
    }

    try {
            const result = await getStreamFile(`${BATH_STORAGE_ROUTE(petId)}/${bathId}/images`);

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