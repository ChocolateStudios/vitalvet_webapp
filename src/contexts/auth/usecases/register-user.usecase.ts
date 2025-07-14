import { UsersApiMock } from "../services/mock/users.mock";
import type { AuthenticatedUserResource } from "../services/resources/authenticated-user.resource";
import type { SaveUserResource } from "../services/resources/save-user.resource";

interface AuthenticationResponse {
    success: boolean;
    message?: string;
}

export function registerUser(saveResource: SaveUserResource): AuthenticationResponse {
    let authenticatedUser: AuthenticatedUserResource | null = null;

    try {
        authenticatedUser = UsersApiMock.registerUser(saveResource);
    } catch (error) {
        if (error instanceof Error){
            if (error.message === "Username already taken") {
                return {
                    success: false,
                    message: "El nombre de usuario ya está en uso.",
                };
            }
        }
    }

    if (!authenticatedUser) {
        return {
            success: false,
            message: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
        };
    }

    localStorage.setItem("token", authenticatedUser.token);
    return {
        success: true,
        message: "Usuario registrado correctamente",
    };
}