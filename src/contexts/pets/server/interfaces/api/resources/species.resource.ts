import { BaseModel } from "@/contexts/_shared/server/models/base.model";
import type { Species } from "@/contexts/pets/server/models/species.model";

export class SpeciesResource extends BaseModel {
    public name: string = "";

    public constructor() {
        super();
    }

    public static fromModel(model: Species): SpeciesResource {
        const resource = new SpeciesResource();
        resource.id = model.id;
        resource.name = model.name;
        return resource;
    }
}