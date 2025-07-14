import { UsersApiMock } from "../services/mock/users.mock";
import type { AuthenticatedUserResource } from "../services/resources/authenticated-user.resource";
import type { SaveUserResource } from "../services/resources/save-user.resource";

interface AuthenticationResponse {
    success: boolean;
    message?: string;
}

export function loginUser(saveResource: SaveUserResource): AuthenticationResponse {
    let authenticatedUser: AuthenticatedUserResource | null = null; 

    try {
        authenticatedUser = UsersApiMock.loginUser(saveResource);
    } catch (error) {
        if (error instanceof Error){
            if (error.message === "User not found") {
                return {
                    success: false,
                    message: "El usuario o contraseña son incorrectos.",
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
        message: "Usuario logueado correctamente",
    };
}