import { BaseModel } from "@/contexts/_shared/server/models/base.model";
import type { Role } from "@/contexts/profiles/server/models/role.model";

export class RoleResource extends BaseModel {
    public name: string = "";

    public constructor() {
        super();
    }

    public static fromModel(model: Role): RoleResource {
        const resource = new RoleResource();
        resource.id = model.id;
        resource.name = model.name;
        return resource;
    }
}