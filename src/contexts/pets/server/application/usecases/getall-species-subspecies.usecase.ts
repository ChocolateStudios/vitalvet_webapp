import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { SpeciesRepository } from "@/contexts/pets/server/infrastructure/repositories/species.repository";
import type { SpeciesResource } from "@/contexts/pets/server/interfaces/api/resources/species.resource";
import { SubspeciesRepository } from "@/contexts/pets/server/infrastructure/repositories/subspecies.repository";
import type { SubspeciesResource } from "@/contexts/pets/server/interfaces/api/resources/subspecies.resource";

export async function getAllSpecies(): Promise<UsecaseResult<SpeciesResource[]>> {
    const species = await SpeciesRepository.getAllSpecies();

    return {
        data: species,
        success: true,
    };
}

export async function getAllSubspecies(): Promise<UsecaseResult<SubspeciesResource[]>> {
    const subspecies = await SubspeciesRepository.getAllSubspecies();

    return {
        data: subspecies,
        success: true,
    };
}