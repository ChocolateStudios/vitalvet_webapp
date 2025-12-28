import { SubspeciesRepository } from "@/contexts/pets/server/infrastructure/repositories/subspecies.repository";
import { SaveSubspeciesResource } from "@/contexts/pets/server/interfaces/api/resources/save-subspecies.resource";
import type { APIRoute } from "astro";


export const POST: APIRoute = async ({ request, params }) => {
    const { speciesId } = params;
    if (!speciesId) {
        return new Response(JSON.stringify({ message: 'Species ID is required' }), { status: 400 });
    }

    try {
        const body = await request.json();
        const resource = SaveSubspeciesResource.fromJsonBody(body);
        const newSubspecies = await SubspeciesRepository.createSubspecies(resource, speciesId);
        return new Response(JSON.stringify(newSubspecies), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};