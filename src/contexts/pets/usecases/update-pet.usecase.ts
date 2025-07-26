import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SavePetResource } from "@/contexts/pets/services/resources/save-pet.resource";

export async function updatePet(petId: string, pet: SavePetResource, baseUrl: string = ''): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`${baseUrl}/api/pets/${petId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pet),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo actualizar la mascota",
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