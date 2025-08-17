import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";
import type { ProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/profile.resource";

export async function updateProfile(saveResource: SaveProfileResource, userId?: string): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`/api/profiles`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...saveResource,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || `Perfil no encontrado`,
            };
        }

        // const existingProfile: ProfileResource = await response.json();

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}