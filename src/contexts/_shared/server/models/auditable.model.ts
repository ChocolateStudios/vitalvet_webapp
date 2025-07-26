import { BaseModel } from "./base.model";

export class AuditableModel extends BaseModel {
    public createdAt: Date = new Date();
    public updatedAt: Date = new Date();
}