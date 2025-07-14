/**
 
 */

import type { Pet } from "../../models/pet.model";
import { PetResource } from "../resources/pet.resource";
import type { SavePetResource } from "../resources/save-pet.resource";

const pets: Pet[] = [
    {
        id: 1,
        name: "Pepito",
        age: 6,
        species: "Perro",
        subspecies: "Golden Retriever",
        imgUrl: "",
        weight: 5.5,
        birthday: new Date(2025, 0, 15, 3, 5, 12),
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
    },
    {
        id: 2,
        name: "Jaimito",
        age: 4,
        species: "Jaguar",
        subspecies: "Golden Retriever",
        imgUrl: "",
        weight: 5.5,
        birthday: new Date(2025, 0, 15, 3, 5, 12),
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
    },
    {
        id: 3,
        name: "Pablito",
        age: 8,
        species: "Pájaro",
        subspecies: "Golden Retriever",
        imgUrl: "",
        weight: 5.5,
        birthday: new Date(2025, 0, 15, 3, 5, 12),
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
    },
    {
        id: 4,
        name: "Julio",
        age: 6,
        species: "Águila",
        subspecies: "Golden Retriever",
        imgUrl: "",
        weight: 5.5,
        birthday: new Date(2025, 0, 15, 3, 5, 12),
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
    },
];

export class PetsApiMock {
    static registerPet(data: SavePetResource): PetResource {
        const newPet: Pet = data.toModel();
        newPet.id = pets.length + 1;

        pets.push(newPet);

        return PetResource.fromModel(newPet);
    }

    static updatePet(petId: number, data: SavePetResource): PetResource {
        const existingPet = pets.find(pet => pet.id === petId);

        if (!existingPet) {
            throw Error(`Pet not found with id ${petId}`);
        }

        existingPet.name = data.name;
        existingPet.age = data.age;
        existingPet.species = data.species;
        existingPet.imgUrl = data.imgUrl;
        existingPet.weight = data.weight;

        return PetResource.fromModel(existingPet);
    }

    static deletePet(petId: number): PetResource {
        const existingPet = pets.find(pet => pet.id === petId);

        if (!existingPet) {
            throw Error(`Pet not found with id ${petId}`);
        }

        pets.splice(pets.indexOf(existingPet), 1);
        return PetResource.fromModel(existingPet);
    }

    static getPet(petId: number): PetResource {
        const existingPet = pets.find(pet => pet.id === petId);

        if (!existingPet) {
            throw Error(`Pet not found with id ${petId}`);
        }

        return PetResource.fromModel(existingPet);
    }

    static getAllPets(): PetResource[] {
        const allPets = pets.map(pet => PetResource.fromModel(pet));
        return allPets;
    }
}