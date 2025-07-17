import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import type { Profile } from "@/contexts/profiles/models/profile.model";
import type { ProfileResource } from "@/contexts/profiles/services/resources/profile.resource";
import { ProfilesRepository } from "@/contexts/profiles/services/repositories/profiles.repository";

interface ProfileInfo extends Profile {
    email: string;
}

export async function getProfile(): Promise<UsecaseResult<ProfileInfo>> {
    let existingProfile: ProfileResource;

    const token = localStorage.getItem('token');
    if (!token) {
        return {
            success: false,
            errorMessage: `El usuario no inició sesión correctamente.`,
        }
    }

    const userId = token.split('.')[1];

    try {
        existingProfile = await ProfilesRepository.getProfileByUserId(userId); // obtener user Id de token de localstorage
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        }
    }

    if (!existingProfile) {
        return {
            success: false,
            errorMessage: `Perfil no encontrado`,
        }
    }

    return {
        data: {
            ...existingProfile,
            email: "helloworld@example.com",
            userId: userId,
        },
        success: true,
    };
}