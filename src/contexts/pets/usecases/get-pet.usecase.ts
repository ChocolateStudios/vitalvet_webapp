import type { Pet } from "../models/pet.model";
import type { PetResource } from "../services/resources/pet.resource";
import { PetsApiMock } from "../services/mock/pets.mock";

interface PetInfo extends Pet {
    ownerName: string;
}

export function getPet(petId: number): PetInfo {
    const existingPet: PetResource = PetsApiMock.getPet(petId);

    if (!existingPet) {
        // TODO: return error message
    }

    return {
        ...existingPet,
        ownerName: "Dueño de ejemplo"
    };
}