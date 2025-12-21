import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SavePetResource } from "@/contexts/pets/server/interfaces/api/resources/save-pet.resource";
import { getTexts } from "@/i18n";
const { pets: petsTexts, } = getTexts();

export async function updatePet(petId: string, pet: SavePetResource): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`/api/pets/${petId}`, {
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
                errorMessage: errorData.message || petsTexts.feedback.updateError,
            };
        }

        const updatedPet = await response.json();

        return {
            success: true,
            data: {
                id: updatedPet.id,
            }
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}