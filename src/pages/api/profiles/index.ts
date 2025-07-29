import type { APIRoute } from "astro";
import { getProfile } from "@/contexts/profiles/server/application/usecases/get-profile.usecase";
import { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";
import { createProfile } from "@/contexts/profiles/server/application/usecases/create-profile.usecase";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const body = await request.json();
        const userId = body.userId ?? locals.authenticatedUserId;
        
        const newProfile = await createProfile(body, userId);
        return new Response(JSON.stringify(newProfile.data), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching profile:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const GET: APIRoute = async ({ locals }) => {
    try {
        const profile = await getProfile(locals.authenticatedUserId);
        return new Response(JSON.stringify(profile.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching profile:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};