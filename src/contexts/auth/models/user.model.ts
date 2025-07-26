import { BaseModel } from "../../_shared/server/models/base.model";

export class User extends BaseModel {
    public username: string = "";
    public password: string = "";
}