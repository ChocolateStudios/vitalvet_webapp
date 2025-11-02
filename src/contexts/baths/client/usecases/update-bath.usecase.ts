import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SaveBathResource } from "@/contexts/baths/server/interfaces/api/resources/save-bath.resource";

export async function updateBath(petId: string, bathId: string, bath: SaveBathResource): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`/api/pets/${petId}/baths/${bathId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bath),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo actualizar el baño",
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