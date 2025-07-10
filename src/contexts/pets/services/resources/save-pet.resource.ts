import type { Pet } from "../../models/pet.model";

export class SavePetResource {
    public name: string;
    public age: number;
    public species: string;
    public imgUrl: string;
    public weight: number;

    constructor(name: string, age: number, species: string, imgUrl: string, weight: number) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.imgUrl = imgUrl;
        this.weight = weight;
    }

    public toPet(): Pet {
        return {
            id: 0,
            name: this.name,
            age: this.age,
            species: this.species,
            imgUrl: this.imgUrl,
            weight: this.weight,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}