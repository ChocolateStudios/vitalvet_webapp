import { BaseModel } from "../../../_shared/models/base.model";
import type { User } from "../../models/user.model";

export class UserResource extends BaseModel {
    public username: string = "";
    public password: string = "";

    public constructor() {
        super();
    }

    public static fromModel(model: User): UserResource {
        const resource = new UserResource();
        resource.username = model.username;
        resource.password = model.password;
        return resource;
    }
}