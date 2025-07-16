import { PetsRepository } from "@/contexts/pets/services/repositories/pets.repository";
import type { PetResource } from "@/contexts/pets/services/resources/pet.resource";
import type { SavePetResource } from "@/contexts/pets/services/resources/save-pet.resource";
import type { Pet } from "@/contexts/pets/models/pet.model";
import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";

interface PetInfo extends Pet {
    ownerName: string;
}

export async function createPet(pet: SavePetResource): Promise<UsecaseResult<PetInfo>> {
    let existingPet: PetResource;
    
    try {
        existingPet = await PetsRepository.registerPet(pet);
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }

    if (!existingPet) {
        return {
            success: false,
            errorMessage: "No se pudo crear la mascota",
        };
    }

    return {
        data: {
            ...existingPet,
            ownerName: "John Doe",
        },
        success: true,
    }
}