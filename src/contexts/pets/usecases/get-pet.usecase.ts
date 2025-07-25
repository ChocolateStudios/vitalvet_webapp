import type { Pet } from "@/contexts/pets/models/pet.model";
import type { PetResource } from "@/contexts/pets/services/resources/pet.resource";
import { PetsApiMock } from "@/contexts/pets/services/mock/pets.mock";
import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";

interface PetInfo extends Pet {
    ownerName: string;
}

export async function getPet(petId: string): Promise<UsecaseResult<PetInfo>> {
    try {
        const response = await fetch(`/api/pets/${petId}`);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || `Mascota no encontrada con el id ${petId}`,
            };
        }

        const existingPet: PetResource = await response.json();

        return {
            data: {
                ...existingPet,
                ownerName: "John Doe"
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

export function getPetMocked(petId: number): PetInfo {
    const existingPet: PetResource = PetsApiMock.getPet(petId);

    if (!existingPet) {
        // TODO: return error message
    }

    return {
        ...existingPet,
        ownerName: "Dueño de ejemplo"
    };
}