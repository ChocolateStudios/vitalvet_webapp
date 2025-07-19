import type { User } from "../../models/user.model";

export class SaveUserResource {
    public username: string;
    public password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    public toModel(): User {
        const user: User = {
            id: 0,
            username: this.username,
            password: this.password,
            stringId: ""
        };

        return user;
    }
}