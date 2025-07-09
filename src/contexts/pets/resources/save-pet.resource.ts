import type { Pet } from "../models/pet.model";

export class SavePetResource {
    public name: string;
    public age: number;
    public species: string;
    public imgUrl: string;

    constructor(name: string, age: number, species: string, imgUrl: string) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.imgUrl = imgUrl;
    }

    public toPet(): Pet {
        return {
            id: 0,
            name: this.name,
            age: this.age,
            species: this.species,
            imgUrl: this.imgUrl,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}