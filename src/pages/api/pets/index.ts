import type { APIRoute } from 'astro';
import { PetsApi } from '@/contexts/pets/services/api/pets.api';
import type { SavePetResource } from '@/contexts/pets/services/resources/save-pet.resource';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    try {
        const pets = await PetsApi.getAllPets();
        return new Response(JSON.stringify(pets), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const resource: SavePetResource = body;
        const newPet = await PetsApi.createPet(resource);
        return new Response(JSON.stringify(newPet), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
