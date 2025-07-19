import { AuthenticatedUserResource } from "@/contexts/auth/services/resources/authenticated-user.resource";
import type { SaveUserResource } from "@/contexts/auth/services/resources/save-user.resource";
import { UserResource } from "@/contexts/auth/services/resources/user.resource";

export class UsersRepository {

    static async registerUser(data: SaveUserResource): Promise<AuthenticatedUserResource> {
        throw new Error("Method not implemented.");
    }

    static async loginUser(data: SaveUserResource): Promise<AuthenticatedUserResource> {
        throw new Error("Method not implemented.");
    }

    static async updateUser(userId: string, data: SaveUserResource): Promise<AuthenticatedUserResource> {
        throw new Error("Method not implemented.");
    }

    static async deleteUser(userId: string): Promise<UserResource> {
        throw new Error("Method not implemented.");
    }

    static async getUser(userId: string): Promise<UserResource> {
        throw new Error("Method not implemented.");
    }

    static async getAllUsers(): Promise<UserResource[]> {
        throw new Error("Method not implemented.");
    }
}