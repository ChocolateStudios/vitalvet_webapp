import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { PetListItemInfo } from "@/contexts/pets/client/usecases/getall-pets.usecase";
import type { PetResource } from "@/contexts/pets/server/interfaces/api/resources/pet.resource";
import { PetStatus } from "@/contexts/pets/server/models/pet-status.enum";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";

export async function getAllPets(): Promise<UsecaseResult<PetListItemInfo[]>> {
    const pets = await PetsRepository.getAllPets();

    // Crear una lista de IDs únicos de los doctores para evitar consultas duplicadas.
    const uniqueOwnerProfileIds = [...new Set(pets.map(pet => pet.ownerProfileId as string))];

    const petOwners = await ProfilesRepository.getAllProfilesByIds(uniqueOwnerProfileIds);

    const petsInfo = pets.map((pet: PetResource) => {
        const owner = petOwners.find(owner => owner.id === pet.ownerProfileId);

        return {
            id: pet.id,
            name: pet.name,
            medicalAppointmentsCount: pet.medicalAppointmentsCount,
            owner: owner?.name + ' ' + owner?.lastname,
            species: pet.species,
            subspecies: pet.subspecies,
            isDead: (pet.status as PetStatus) === PetStatus.Inactive,
        };
    });

    return {
        data: petsInfo,
        success: true,
    };
}