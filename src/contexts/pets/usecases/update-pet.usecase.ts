import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import type { SavePetResource } from "@/contexts/pets/services/resources/save-pet.resource";
import type { PetResource } from "@/contexts/pets/services/resources/pet.resource";
import type { Pet } from "@/contexts/pets/models/pet.model";
import { PetsRepository } from "@/contexts/pets/services/repositories/pets.repository";

// interface PetInfo extends Pet {
//     ownerName: string;
// }

export async function updatePet(petId: string, pet: SavePetResource): Promise<UsecaseResult<any>> {
    let existingPet: PetResource;
    
    try {
        existingPet = await PetsRepository.updatePet(petId, pet);
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }

    if (!existingPet) {
        return {
            success: false,
            errorMessage: "No se pudo actualizar la mascota",
        };
    }

    return {
        success: true,
    }
}