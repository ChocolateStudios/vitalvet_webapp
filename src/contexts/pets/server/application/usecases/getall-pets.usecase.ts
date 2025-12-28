import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";
import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";
import type { PetResource } from "@/contexts/pets/server/interfaces/api/resources/pet.resource";
import { PetStatus } from "@/contexts/pets/server/models/pet-status.enum";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import { SpeciesRepository } from "@/contexts/pets/server/infrastructure/repositories/species.repository";
import { SubspeciesRepository } from "@/contexts/pets/server/infrastructure/repositories/subspecies.repository";
import type { PetListItemResource } from "@/contexts/pets/server/interfaces/api/resources/pet-list-item.resource";

export async function getAllPets(): Promise<UsecaseResult<PetListItemResource[]>> {
    const pets = await PetsRepository.getAllPets();

    // Crear una lista de IDs únicos de los doctores para evitar consultas duplicadas.
    const uniqueOwnerProfileIds = [...new Set(pets.map(pet => pet.ownerProfileId as string))];

    const petOwners = await ProfilesRepository.getAllProfilesByIds(uniqueOwnerProfileIds);
    const allSpecies = await SpeciesRepository.getAllSpecies();
    const allSubspecies = await SubspeciesRepository.getAllSubspecies();

    const petsInfo = pets.map((pet: PetResource) => {
        const owner = petOwners.find(owner => owner.id === pet.ownerProfileId);
        const species = allSpecies.find(species => species.id.toString() === allSubspecies.find(subspecies => subspecies.id === pet.subspeciesId)?.speciesId.toString())?.name;
        const subspecies = allSubspecies.find(subspecies => subspecies.id === pet.subspeciesId)?.name;

        return {
            id: pet.id,
            name: pet.name,
            medicalAppointmentsCount: pet.medicalAppointmentsCount,
            bathsCount: pet.bathsCount,
            owner: owner?.name + ' ' + owner?.lastname,
            species: species,
            subspecies: subspecies,
            isDead: (pet.status as PetStatus) === PetStatus.Inactive,
        };
    });

    return {
        data: petsInfo,
        success: true,
    };
}