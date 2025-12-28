import type { APIRoute } from "astro";
import { createProfile } from "@/contexts/profiles/server/application/usecases/create-profile.usecase";
import { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        
        const saveResource = SaveProfileResource.fromJsonBody(body);
        
        const newProfile = await createProfile(saveResource);
        return new Response(JSON.stringify(newProfile.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error creating profile:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};