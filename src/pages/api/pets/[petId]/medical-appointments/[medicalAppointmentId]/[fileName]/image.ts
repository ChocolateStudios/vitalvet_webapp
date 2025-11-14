import type { APIRoute } from 'astro';
import { MEDICAL_APPOINTMENT_STORAGE_ROUTE } from '@/contexts/files/server/infrastructure/repositories/file.repository';
import { getStreamFile } from '@/contexts/files/server/application/usecases/get-stream-file.usecase';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const { petId, medicalAppointmentId, fileName } = params;
    if (!petId) {
        return new Response('Pet ID is required', { status: 400 });
    }
    if (!medicalAppointmentId) {
        return new Response(JSON.stringify({ message: 'Medical Appointment ID is required' }), { status: 400 });
    }
    if (!fileName) {
        return new Response(JSON.stringify({ message: 'File name is required' }), { status: 400 });
    }

    try {
            const result = await getStreamFile(`${MEDICAL_APPOINTMENT_STORAGE_ROUTE(petId)}/${medicalAppointmentId}/images/${fileName}`);

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