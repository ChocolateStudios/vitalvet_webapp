import type { APIRoute } from 'astro';
import { SaveBathResource } from '@/contexts/baths/server/interfaces/api/resources/save-bath.resource';
import { BathsRepository } from '@/contexts/baths/server/infrastructure/repositories/baths.repository';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        const appointments = await BathsRepository.getAllBathsByPetId(petId);
        return new Response(JSON.stringify(appointments), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request, params }) => {
    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        const body = await request.json();
        const resource = new SaveBathResource(
            new Date(body.bathDate),
            body.observations,
            body.doctorProfileId,
        );
        const newAppointment = await BathsRepository.registerBath(petId, resource);
        return new Response(JSON.stringify(newAppointment), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        // console.log(error)
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
