export class PetsApi {
    static registerPet(data: SavePetResource): PetResource {
        const newPet: Pet = data.toPet();
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

    static getAllPet(): PetResource[] {
        const allPets = pets.map(pet => PetResource.fromModel(pet));
        return allPets;
    }
}