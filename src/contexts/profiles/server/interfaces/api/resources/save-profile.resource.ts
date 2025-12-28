import type { Profile } from "@/contexts/profiles/server/models/profile.model";

export class SaveProfileResource {
    public name: string;
    public lastname: string;
    public email: string;
    public phone: string;
    public birthday: Date;
    public roleId: string;
    public avatarURL?: string;

    constructor(name: string, lastname: string, email: string, phone: string, birthday: Date, roleId: string) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.phone = phone;
        this.birthday = birthday;
        this.roleId = roleId;
    }

    public toModel(): Profile {
        return {
            id: 0,
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            birthday: this.birthday,
            roleId: this.roleId,
            avatarURL: this.avatarURL,
            userId: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        }
    }

    public static fromJsonBody(body: any): SaveProfileResource {
        return new SaveProfileResource(
            body.name,
            body.lastname,
            body.email,
            body.phone,
            new Date(body.birthday),
            body.roleId,
        );
    }
}