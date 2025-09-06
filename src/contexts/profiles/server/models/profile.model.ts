import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";

export class Profile extends AuditableModel {
    public name: string = "";
    public lastname: string = "";
    public email: string = "";
    public phone: string = "";
    public birthday: Date = new Date();
    public userId: string = "";
    public roleId: string = "";
}