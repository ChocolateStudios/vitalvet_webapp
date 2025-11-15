import { getProfileById } from "@/contexts/profiles/server/application/usecases/get-profile.usecase";
import { updateProfile } from "@/contexts/profiles/server/application/usecases/update-profile.usecase";
import { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";
import type { APIRoute } from "astro";

export const PUT: APIRoute = async ({ request, params }) => {
    try {
        const body = await request.json();
        const { profileId } = params;
        
        const saveResource = new SaveProfileResource(
            body.name,
            body.lastname,
            body.email,
            body.phone,
            new Date(body.birthday),
            body.roleId,
        );
        
        const profileUpdated = await updateProfile(saveResource, profileId);
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

// export const GET: APIRoute = async ({ params }) => {
//     try {
//         const { profileId } = params;

//         const profile = await getProfileById(profileId);
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