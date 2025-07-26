import type { Profile } from "@/contexts/profiles/server/models/profile.model";

export class SaveProfileResource {
    public name: string;
    public lastname: string;
    public phone: string;
    public birthday: Date;
    public roleId: string;

    constructor(name: string, lastname: string, roleId: string, phone: string, birthday: Date) {
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.birthday = birthday;
        this.roleId = roleId;
    }

    public toModel(): Profile {
        return {
            id: 0,
            stringId: "",
            name: this.name,
            lastname: this.lastname,
            phone: this.phone,
            birthday: this.birthday,
            roleId: this.roleId,
            userId: "",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}