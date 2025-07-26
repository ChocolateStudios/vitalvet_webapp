import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import type { Profile } from "@/contexts/profiles/models/profile.model";
import type { ProfileResource } from "@/contexts/profiles/services/resources/profile.resource";
import { ProfilesRepository } from "@/contexts/profiles/services/repositories/profiles.repository";

interface ProfileInfo extends Profile {
    email: string;
}

export async function getProfile(token: string, baseUrl: string = ''): Promise<UsecaseResult<ProfileInfo>> {
    try {
        const response = await fetch(`${baseUrl}/api/profiles`);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || `Perfil no encontrado`,
            };
        }

        const existingProfile: ProfileResource = await response.json();

        return {
            data: {
                ...existingProfile,
                email: 'lol',
            },
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}