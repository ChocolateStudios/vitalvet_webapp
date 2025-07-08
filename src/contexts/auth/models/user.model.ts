import type { BaseModel } from "../../_shared/models/base.model";
import type { AuditableModel } from "../../_shared/models/auditable.model";

export interface User extends BaseModel, AuditableModel {
    username: string;
    password: string;
}