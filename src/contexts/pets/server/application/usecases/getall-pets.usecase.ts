import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export async function getAllPets(): Promise<UsecaseResult<any[]>> {
    const pets = await PetsRepository.getAllPets();

    return {
        data: pets,
        success: true,
    };
}