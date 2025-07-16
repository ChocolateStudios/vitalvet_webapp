import { PetsRepository } from "@/contexts/pets/services/repositories/pets.repository";
import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import type { PetResource } from "@/contexts/pets/services/resources/pet.resource";

export async function deletePet(petId: string): Promise<UsecaseResult<any>> {
    let existingPet: PetResource;
    
    try {
        existingPet = await PetsRepository.deletePet(petId);
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }

    if (!existingPet) {
        return {
            success: false,
            errorMessage: "No se pudo eliminar la mascota",
        };
    }

    return {
        success: true,
    }
}