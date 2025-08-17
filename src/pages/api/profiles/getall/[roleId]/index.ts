import { getAllProfilesByRoleId } from "@/contexts/profiles/server/application/usecases/get-all-profiles-by-role-id.usecase";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params, locals }) => {
    const { roleId } = params;
    if (!roleId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        const profiles = await getAllProfilesByRoleId(locals.authenticatedUserId);
        return new Response(JSON.stringify(profiles.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching profiles:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};