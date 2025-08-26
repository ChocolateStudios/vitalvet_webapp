import { BaseModel } from "@/contexts/_shared/server/models/base.model";
import type { Subspecies } from "@/contexts/pets/server/models/subspecies.model";

export class SubspeciesResource extends BaseModel {
    public name: string = "";
    public speciesId: number | string = 0;

    public constructor() {
        super();
    }

    public static fromModel(model: Subspecies): SubspeciesResource {
        const resource = new SubspeciesResource();
        resource.id = model.id;
        resource.name = model.name;
        resource.speciesId = model.speciesId;
        return resource;
    }
}