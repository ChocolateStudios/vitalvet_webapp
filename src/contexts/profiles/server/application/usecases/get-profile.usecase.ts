import { verifyToken } from "@/contexts/auth/server/utils/jwt.util";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";

export async function getProfile(userId?: string): Promise<Response> {
    if (!userId) {
        return new Response(JSON.stringify({ message: 'No se encontró user Id.' }), { status: 401 });
    }

    try {
        const profile = await ProfilesRepository.getProfileByUserId(userId);
        return new Response(JSON.stringify(profile), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching profile:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
}