import type { Pet } from "@/contexts/pets/models/pet.model";
import type { PetResource } from "@/contexts/pets/services/resources/pet.resource";
import { PetsApiMock } from "@/contexts/pets/services/mock/pets.mock";
import { PetsRepository } from "@/contexts/pets/services/repositories/pets.repository";
import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";

interface PetInfo extends Pet {
    ownerName: string;
}

export async function getPet(petId: string): Promise<UsecaseResult<PetInfo>> {
    let existingPet: PetResource;

    try {
        existingPet = await PetsRepository.getPet(petId);
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        }
    }

    if (!existingPet) {
        return {
            success: false,
            errorMessage: `Mascota no encontrada con el id ${petId}`,
        }
    }

    return {
        data: {
            ...existingPet,
            ownerName: "John Doe"
        },
        success: true,
    };
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