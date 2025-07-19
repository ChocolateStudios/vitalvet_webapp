import type { User } from "../../models/user.model";

export class SaveUserResource {
    public username: string;
    public password: string;
    public name: string | null;
    public lastname: string | null;

    constructor(username: string, password: string, name: string | null = null, lastname: string | null = null) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
    }

    public toModel(): User {
        const user: User = {
            id: 0,
            username: this.username,
            password: this.password,
            stringId: "",
            name: this.name || "",
            lastname: this.lastname || ""
        };

        return user;
    }
}