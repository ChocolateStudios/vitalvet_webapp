import { AuditableModel } from "../../../_shared/models/auditable.model";
import type { Pet } from "../../models/pet.model";

export class PetResource extends AuditableModel {
    public name: string = "";
    public age: number = 0;
    public species: string = "";
    public subspecies: string = "";
    public imgUrl: string = "";
    public weight: number = 0;
    public birthday: Date = new Date();

    public constructor() {
        super();
    }

    public static fromModel(model: Pet): PetResource {
        const resource = new PetResource();
        resource.id = model.id;
        resource.stringId = model.stringId;
        resource.name = model.name;
        resource.age = model.age;
        resource.species = model.species;
        resource.subspecies = model.subspecies;
        resource.imgUrl = model.imgUrl;
        resource.birthday = model.birthday;
        resource.createdAt = model.createdAt;
        resource.updatedAt = model.updatedAt;
        return resource;
    }
}