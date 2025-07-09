import { http } from "../../_shared/api/http-common.api";

export class UsersApi {
    private static baseUrl = "users";

    static async registerUser(data: SaveUserResource): Promise<AxiosResponse<AuthenticatedUserResource, any>> {
        return await http.post(`${this.baseUrl}/register`, data);
    }

    static async loginUser(data: SaveUserResource): Promise<AxiosResponse<AuthenticatedUserResource, any>> {
        return await http.post(`${this.baseUrl}/login`, data);
    }

    static async updateUserUsername(data: SaveUserResource): Promise<AxiosResponse<AuthenticatedUserResource, any>> {
        return await http.put(`${this.baseUrl}/update/username`, data);
    }

    static async updateUserPassword(data: SaveUserResource): Promise<AxiosResponse<UserResource, any>> {
        return await http.put(`${this.baseUrl}/update/password`, data);
    }

    static async getUser(): Promise<AxiosResponse<UserResource, any>> {
        return await http.get(this.baseUrl);
    }
}