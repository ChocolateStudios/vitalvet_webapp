import { ProfilesApi } from "@/contexts/profiles/server/interfaces/api/profiles.api";
import { verifyToken } from "@/contexts/auth/utils/jwt.util";
import type { APIRoute } from "astro";
import { getProfile } from "@/contexts/profiles/server/application/usecases/get-profile.usecase";

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
    // let token;
    
    // try {
        // 1. Obtener el token directamente de la cookie.
        // token = cookies.get('token')?.value;

        // if (!token) {
        //     return new Response(JSON.stringify({ message: 'No autorizado: Token no encontrado en las cookies.' }), { status: 401 });
        // }

        // let userId: string;

        // try {
        //     // 2. Verificar y decodificar el token usando tu función `verifyToken`
        //     const payload = verifyToken(token);
        //     // Según tu `JwtPayload`, el ID está en la propiedad `userId`
        //     if (!payload.userId) {
        //         return new Response(JSON.stringify({ message: 'Invalid token payload' }), { status: 401 });
        //     }
        //     userId = payload.userId;
        // } catch (err) {
        //     // Tu función `verifyToken` ya maneja el error y lanza uno nuevo.
        //     return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 401 });
        // }

        // // 3. Usar el userId para obtener el perfil
        // const profile = await ProfilesApi.getProfileByUserId(userId);
        // return new Response(JSON.stringify(profile), {
        //     status: 200,
        //     headers: { 'Content-Type': 'application/json' }
        // });
    // } catch (error) {
    //     const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    //     console.error("Error fetching profile:", errorMessage); // Loguear el error real para depuración
    //     return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    // }
    // const token = cookies.get('token')?.value;
    return await getProfile(locals.authenticatedUserId);
};