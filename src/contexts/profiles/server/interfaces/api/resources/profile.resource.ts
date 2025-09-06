import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import type { Profile } from "@/contexts/profiles/server/models/profile.model";

export class ProfileResource extends AuditableModel {
    public name: string = "";
    public lastname: string = "";
    public email: string = "";
    public phone: string = "";
    public birthday: Date = new Date();
    public userId: string = "";
    public roleId: string = "";
    public roleName: string = "";
    public me: boolean = false;

    public constructor() {
        super();
    }

    public static fromModel(model: Profile): ProfileResource {
        const resource = new ProfileResource();
        resource.id = model.id;
        resource.name = model.name;
        resource.lastname = model.lastname;
        resource.email = model.email;
        resource.phone = model.phone;
        resource.birthday = model.birthday;
        resource.userId = model.userId;
        resource.roleId = model.roleId;
        resource.createdAt = model.createdAt;
        resource.updatedAt = model.updatedAt;
        return resource;
    }
}