import type { PetStatus } from "@/contexts/pets/server/models/pet-status.enum";
import type { Pet } from "@/contexts/pets/server/models/pet.model";

export class SavePetResource {
    public name: string;
    public species: string;
    public subspecies: string;
    public imgUrl: string;
    public birthday: Date;
    public status: string;
    public ownerProfileId: number | string;

    constructor(name: string, species: string, subspecies: string, imgUrl: string, birthday: Date, status: string, ownerProfileId: number | string) {
        this.name = name;
        this.species = species;
        this.subspecies = subspecies;
        this.imgUrl = imgUrl;
        this.birthday = birthday;
        this.status = status;
        this.ownerProfileId = ownerProfileId;
    }

    public toModel(): Pet {
        return {
            id: 0,
            name: this.name,
            species: this.species,
            subspecies: this.subspecies,
            imgUrl: this.imgUrl,
            birthday: this.birthday,
            status: this.status as PetStatus,
            ownerProfileId: this.ownerProfileId,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}