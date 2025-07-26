import { ProfilesApi } from "@/contexts/profiles/services/api/profiles.api";
import { verifyToken } from "@/contexts/auth/utils/jwt.util";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ cookies }) => {
    try {
        // 1. Obtener el token directamente de la cookie.
        const token = cookies.get('token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ message: 'No autorizado: Token no encontrado en las cookies.' }), { status: 401 });
        }

        let userId: string;

        try {
            // 2. Verificar y decodificar el token usando tu función `verifyToken`
            const payload = verifyToken(token);
            // Según tu `JwtPayload`, el ID está en la propiedad `userId`
            if (!payload.userId) {
                return new Response(JSON.stringify({ message: 'Invalid token payload' }), { status: 401 });
            }
            userId = payload.userId;
        } catch (err) {
            // Tu función `verifyToken` ya maneja el error y lanza uno nuevo.
            return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 401 });
        }

        // 3. Usar el userId para obtener el perfil
        const profile = await ProfilesApi.getProfileByUserId(userId);
        return new Response(JSON.stringify(profile), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching profile:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};