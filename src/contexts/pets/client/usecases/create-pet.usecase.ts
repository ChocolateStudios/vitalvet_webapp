import type { SavePetResource } from "@/contexts/pets/server/interfaces/api/resources/save-pet.resource";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export async function createPet(pet: SavePetResource, baseUrl: string = ''): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`${baseUrl}/api/pets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pet),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo crear la mascota",
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