import type { Pet } from "@/contexts/pets/models/pet.model";
import { PetsApiMock } from "@/contexts/pets/services/mock/pets.mock";
import { PetsRepository } from "@/contexts/pets/services/repositories/pets.repository";

interface PetListItemInfo extends Pet {
    lastVisit: Date,
    appointmentCount: number,
}

export async function getAllPets(): Promise<PetListItemInfo[]> {
    const pets = await PetsRepository.getAllPets();
    const petsInfo = pets.map(pet => {
        return {
            ...pet,
            lastVisit: new Date(2025, 0, 15, 3, 5, 12),
            appointmentCount: 1,
        };
    })

    return petsInfo;
}

export function getAllPetsMocked(): PetListItemInfo[] {
    const pets = PetsApiMock.getAllPets();
    const petsInfo = pets.map(pet => {
        return {
            ...pet,
            lastVisit: new Date(2025, 0, 15, 3, 5, 12),
            appointmentCount: 1,
        };
    })

    return petsInfo;
}