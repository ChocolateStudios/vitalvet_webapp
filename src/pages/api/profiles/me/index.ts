import type { APIRoute } from "astro";
import { getMyProfile } from "@/contexts/profiles/server/application/usecases/get-profile.usecase";
import { createMyProfile } from "@/contexts/profiles/server/application/usecases/create-profile.usecase";
import { updateMyProfile } from "@/contexts/profiles/server/application/usecases/update-profile.usecase";
import { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
    try {
        const body = await request.json();
        const userId = locals.authenticatedUserId;
        
        const saveResource = new SaveProfileResource(
            body.name,
            body.lastname,
            body.email,
            body.phone,
            new Date(body.birthday),
            body.roleId,
        );
        
        const newProfile = await createMyProfile(saveResource, userId);
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

export const PUT: APIRoute = async ({ request, locals }) => {
    try {
        const body = await request.json();
        const userId = locals.authenticatedUserId;
        
        const saveResource = new SaveProfileResource(
            body.name,
            body.lastname,
            body.email,
            body.phone,
            new Date(body.birthday),
            body.roleId,
        );
        
        const profileUpdated = await updateMyProfile(saveResource, userId);
        return new Response(JSON.stringify(profileUpdated.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error updating profile:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

// export const GET: APIRoute = async ({ locals }) => {
//     try {
//         const profile = await getMyProfile(locals.authenticatedUserId);
//         return new Response(JSON.stringify(profile.data), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' }
//         });
//     } catch (error) {
//         const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
//         console.error("Error fetching profile:", errorMessage); // Loguear el error real para depuración
//         return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
//     }
// };