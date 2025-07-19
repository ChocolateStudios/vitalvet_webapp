import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import type { SaveUserResource } from "../services/resources/save-user.resource";

export async function registerUser(saveResource: SaveUserResource): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: saveResource.username, password: saveResource.password})
        });

        if (response.ok) {
            const authenticatedUser = await response.json();
            localStorage.setItem("token", authenticatedUser.token);
            return {
                success: true,
            };
        } else {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || 'Error al registrar el usuario. Por favor, inténtalo de nuevo.',
            };
        }
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return {
            success: false,
            errorMessage: 'Error al registrar el usuario. Por favor, inténtalo de nuevo.',
        };
    }
}