import type { ServiceResult } from "@/contexts/_shared/client/services/service-result";
import type { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";

export async function updateMyProfile(saveResource: SaveProfileResource): Promise<ServiceResult> {
    try {
        const response = await fetch(`/api/profiles/me`, {
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

export async function updateProfile(saveResource: SaveProfileResource, profileId: string): Promise<ServiceResult> {
    try {
        const response = await fetch(`/api/profiles/${profileId}`, {
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