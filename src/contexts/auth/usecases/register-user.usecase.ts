import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import { UsersApiMock } from "../services/mock/users.mock";
import type { AuthenticatedUserResource } from "../services/resources/authenticated-user.resource";
import type { SaveUserResource } from "../services/resources/save-user.resource";
import { UsersRepository } from "../services/repositories/users.repository";

export async function registerUser(saveResource: SaveUserResource): Promise<UsecaseResult<any>> {
    let authenticatedUser: AuthenticatedUserResource | null = null;

    try {
        authenticatedUser = await UsersRepository.registerUser(saveResource);
    } catch (error) {
        if (error instanceof Error){
            return {
                success: false,
                errorMessage: error.message,
            };
        }
    }

    if (!authenticatedUser) {
        return {
            success: false,
            errorMessage: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
        };
    }

    localStorage.setItem("token", authenticatedUser.token);
    return {
        success: true,
    };
}

export function registerUserMocked(saveResource: SaveUserResource): any/*AuthenticationResponse*/ {
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