import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SaveUserResource } from "../../server/interfaces/api/resources/save-user.resource";

export async function loginUser(saveResource: SaveUserResource): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saveResource)
        });

        if (response.ok || response.redirected) {
            // const authenticatedUser = await response.json();
            // localStorage.setItem("token", authenticatedUser.token);
            return {
                success: true,
            };
        } else {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || 'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
            };
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return {
            success: false,
            errorMessage: 'Error al iniciar sesión. Por favor, inténtalo de nuevo.',
        };
    }
}