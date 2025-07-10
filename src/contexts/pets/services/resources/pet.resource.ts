import { AuditableModel } from "../../../_shared/models/auditable.model";
import type { Pet } from "../../models/pet.model";

export class PetResource extends AuditableModel {
    public name: string = "";
    public age: number = 0;
    public species: string = "";
    public imgUrl: string = "";
    public weight: number = 0;

    public constructor() {
        super();
    }

    public static fromModel(model: Pet): PetResource {
        const resource = new PetResource();
        resource.id = model.id;
        resource.name = model.name;
        resource.age = model.age;
        resource.species = model.species;
        resource.imgUrl = model.imgUrl;
        resource.createdAt = model.createdAt;
        resource.updatedAt = model.updatedAt;
        return resource;
    }
}