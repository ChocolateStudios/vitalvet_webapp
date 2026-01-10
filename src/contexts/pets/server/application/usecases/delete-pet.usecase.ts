import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";
import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";

export async function deletePet(petId: string | number): Promise<UsecaseResult> {
    try {
        const deletedPet = await PetsRepository.deletePet(petId);

        return {
            data: deletedPet,
            success: true,
        };
    }
    catch (error) {
        return {
            data: undefined,
            success: false,
        };
    }
}