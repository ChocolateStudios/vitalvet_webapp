import { AuditableModel } from "@/contexts/_shared/models/auditable.model";

export class Profile extends AuditableModel {
    public name: string = "";
    public lastname: string = "";
    public phone: string = "";
    public birthday: Date = new Date();
    public userId: string = "";
    public roleId: string = "";
}