import type { APIRoute } from 'astro';
import { PetsApi } from '@/contexts/pets/server/interfaces/api/pets.api';
import { SavePetResource } from '@/contexts/pets/server/interfaces/api/resources/save-pet.resource';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        const pet = await PetsApi.getPetById(petId);
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
            body.age,
            body.species,
            body.subspecies,
            body.imgUrl,
            body.weight,
            new Date(body.birthday)
        );
        const updatedPet = await PetsApi.updatePet(petId, resource);
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
        await PetsApi.deletePet(petId);
        return new Response(null, { status: 204 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
