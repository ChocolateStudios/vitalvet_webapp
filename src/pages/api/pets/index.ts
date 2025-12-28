import type { APIRoute } from 'astro';
import { SavePetResource } from '@/contexts/pets/server/interfaces/api/resources/save-pet.resource';
import { PetsRepository } from '@/contexts/pets/server/infrastructure/repositories/pets.repository';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
    try {
        const pets = await PetsRepository.getAllPets();
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
        const resource = SavePetResource.fromJsonBody(body);
        
        const newPet = await PetsRepository.registerPet(resource);
        return new Response(JSON.stringify(newPet), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
