import { BaseModel } from "../../_shared/models/base.model";

export class User extends BaseModel {
    public username: string = "";
    public password: string = "";
}