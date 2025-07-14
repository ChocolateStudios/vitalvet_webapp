import { BaseModel } from "../../../_shared/models/base.model";
import type { User } from "../../models/user.model";

export class AuthenticatedUserResource extends BaseModel {
    public username: string = "";
    public password: string = "";
    public token: string = "";

    public constructor() {
        super();
    }

    public static fromModel(model: User): AuthenticatedUserResource {
        const resource = new AuthenticatedUserResource();
        resource.username = model.username;
        resource.password = model.password;
        resource.token = "";
        return resource;
    }
}