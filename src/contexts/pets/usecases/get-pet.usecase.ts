import type { Pet } from "../models/pet.model";
import type { PetResource } from "../resources/pet.resource";
import { PetsApiMock } from "../services/mock/pets.mock";

interface PetInfo extends Pet {
}

export function getPet(petId: number): PetInfo {
    const existingPet: PetResource = PetsApiMock.getPet(petId);

    if (!existingPet) {
        // TODO: return error message
    }

    return existingPet;
}