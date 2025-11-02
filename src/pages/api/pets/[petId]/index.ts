import type { APIRoute } from 'astro';
// import { PetsApi } from '@/contexts/pets/server/interfaces/api/pets.api';
import { SavePetResource } from '@/contexts/pets/server/interfaces/api/resources/save-pet.resource';
import { PetsRepository } from '@/contexts/pets/server/infrastructure/repositories/pets.repository';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        const pet = await PetsRepository.getPet(petId);
        if (!pet) {
            return new Response(JSON.stringify({ message: 'Pet not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(pet), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const PUT: APIRoute = async ({ request, params }) => {
    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        const body = await request.json();
        const resource = new SavePetResource(
            body.name,
            body.imgUrl,
            new Date(body.birthday),
            body.status,
            body.ownerProfileId,
            body.subspeciesId,
        );
        const updatedPet = await PetsRepository.updatePet(petId, resource);
        return new Response(JSON.stringify(updatedPet), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ params }) => {
    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        await PetsRepository.deletePet(petId);
        return new Response(null, { status: 204 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
