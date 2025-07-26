import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { Profile } from "@/contexts/profiles/server/models/profile.model";
import type { ProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/profile.resource";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";

export interface ProfileInfo extends Profile {
    email: string;
}

export async function getProfile(baseUrl: string = ''): Promise<UsecaseResult<ProfileInfo>> {
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