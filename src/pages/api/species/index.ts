import { SpeciesRepository } from "@/contexts/pets/server/infrastructure/repositories/species.repository";
import { SaveSpeciesResource } from "@/contexts/pets/server/interfaces/api/resources/save-species.resource";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const resource = new SaveSpeciesResource(
            body.name,
        );
        const newSpecies = await SpeciesRepository.createSpecies(resource);
        return new Response(JSON.stringify(newSpecies), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};