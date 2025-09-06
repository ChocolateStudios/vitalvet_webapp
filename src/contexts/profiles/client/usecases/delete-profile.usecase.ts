import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export async function deleteProfile(profileId?: string): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`/api/profiles/${profileId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
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