import type { User } from "../../models/user.model";
import { AuthenticatedUserResource } from "../resources/authenticated-user.resource";
import type { SaveUserResource } from "../resources/save-user.resource";
import { UserResource } from "../resources/user.resource";

const users: User[] = [
    {
        id: 1,
        username: "admin@vitalvet.com",
        password: "admin123456",
        name: "Admin",
        lastname: "Vital",
        stringId: "1"
    },
    {
        id: 2,
        username: "user@vitalvet.com",
        password: "user123456",
        name: "User",
        lastname: "Vital",
        stringId: "2"
    },
    {
        id: 3,
        username: "guest@vitalvet.com",
        password: "guest123456",
        name: "Guest",
        lastname: "Vital",
        stringId: "3"
    }
];

export class UsersApiMock {
    static registerUser(data: SaveUserResource): AuthenticatedUserResource {
        if (users.find(user => user.username === data.username)) {
            throw new Error("Username already taken");
        }

        const newUser: User = data.toModel();
        newUser.id = users.length + 1;
        users.push(newUser);

        const resource = AuthenticatedUserResource.fromModel(newUser);
        resource.token = "mytoken" // TODO
        return resource;
    }

    static loginUser(data: SaveUserResource): AuthenticatedUserResource {
        const existingUser = users.find(user => user.username === data.username);

        if (!existingUser) {
            throw new Error("User not found");
        }

        // TODO generate token
        const resource = AuthenticatedUserResource.fromModel(existingUser);
        resource.token = "mytoken" // TODO
        return resource;
    }

    // static updateUserUsername(data: SaveUserResource): AuthenticatedUserResource {
    //     return await http.put(`${this.baseUrl}/update/username`, data);
    // }

    // static updateUserPassword(data: SaveUserResource): UserResource {
    //     return await http.put(`${this.baseUrl}/update/password`, data);
    // }

    static getUser(token: string): UserResource {
        const existingUser = users.find(user => user.id === 1);

        if (!existingUser) {
            throw new Error("User not found");
        }

        return UserResource.fromModel(existingUser);
    }
}