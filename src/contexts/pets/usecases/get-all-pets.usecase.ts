import type { Pet } from "../models/pet.model";
import { PetsApiMock } from "../services/mock/pets.mock";

interface PetListItemInfo extends Pet {
    lastVisit: Date,
    appointmentCount: number,
}

export function getAllPets(): PetListItemInfo[] {
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