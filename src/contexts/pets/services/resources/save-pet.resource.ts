import type { Pet } from "../../models/pet.model";

export class SavePetResource {
    public name: string;
    public age: number;
    public species: string;
    public subspecies: string;
    public imgUrl: string;
    public weight: number;
    public birthday: Date;

    constructor(name: string, age: number, species: string, subspecies: string, imgUrl: string, weight: number, birthday: Date) {
        this.name = name;
        this.age = age;
        this.species = species;
        this.subspecies = subspecies;
        this.imgUrl = imgUrl;
        this.weight = weight;
        this.birthday = birthday;
    }

    public toModel(): Pet {
        return {
            id: 0,
            name: this.name,
            age: this.age,
            species: this.species,
            subspecies: this.subspecies,
            imgUrl: this.imgUrl,
            weight: this.weight,
            birthday: this.birthday,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}