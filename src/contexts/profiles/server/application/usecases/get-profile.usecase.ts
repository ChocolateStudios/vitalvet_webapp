import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { UsersRepository } from "@/contexts/auth/server/infrastructure/repositories/users.repository";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";

export async function getProfile(userId?: string): Promise<UsecaseResult<any>> {
    if (!userId) {
        throw new Error('No se encontró user Id.');
    }

    const user = await UsersRepository.getUser(userId);
    if (!user) {
        throw new Error('No se encontró el usuario.');
    }

    const profile = await ProfilesRepository.getProfileByUserId(userId);
    profile.email = user.username;

    return {
        data: profile,
        success: true,
    }

    // try {
        
    //     return new Response(JSON.stringify(profile), {
    //         status: 200,
    //         headers: { 'Content-Type': 'application/json' }
    //     });
    // } catch (error) {
    //     const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    //     console.error("Error fetching profile:", errorMessage); // Loguear el error real para depuración
    //     return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    // }
}