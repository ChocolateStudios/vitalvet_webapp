import type { ServiceResult } from "@/contexts/_shared/client/services/service-result";
import type { Profile } from "@/contexts/profiles/server/models/profile.model";
import type { ProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/profile.resource";

export interface ProfileInfo extends Profile {
    email: string;
    roleName: string;
}

export async function getMyProfile(): Promise<ServiceResult<ProfileInfo>> {
    try {
        const response = await fetch(`/api/profiles`);

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