import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import { UsersApiMock } from "../services/mock/users.mock";
import type { AuthenticatedUserResource } from "../services/resources/authenticated-user.resource";
import type { SaveUserResource } from "../services/resources/save-user.resource";
import { UsersRepository } from "../services/repositories/users.repository";

export async function loginUser(saveResource: SaveUserResource): Promise<UsecaseResult<any>> {
    let authenticatedUser: AuthenticatedUserResource | null = null; 

    try {
        authenticatedUser = await UsersRepository.loginUser(saveResource);
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

export function loginUserMocked(saveResource: SaveUserResource): any {
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