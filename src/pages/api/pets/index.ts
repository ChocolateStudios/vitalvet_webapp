import type { APIRoute } from 'astro';
import { PetsApi } from '@/contexts/pets/server/interfaces/api/pets.api';
import { SavePetResource } from '@/contexts/pets/server/interfaces/api/resources/save-pet.resource';

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
        // Re-instanciamos la clase a partir del objeto plano del JSON.
        // Es crucial convertir la fecha de string a Date.
        const resource = new SavePetResource(
            body.name,
            body.age,
            body.species,
            body.subspecies,
            body.imgUrl,
            body.weight,
            new Date(body.birthday)
        );
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
