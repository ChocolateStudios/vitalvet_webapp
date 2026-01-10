import { UsersRepository } from "@/contexts/auth/server/infrastructure/repositories/users.repository";
import { getAuthenticatedUserId } from "./get-authenticated-user-id";

export async function getAuthenticatedUserIdOrRedirect(Astro: any): Promise<string | number> {
    // 1. Obtener el token de la cookie en el servidor.
    const token = Astro.cookies.get('__session')?.value;

    if (!token) {
        // Si no hay token, redirigir al login.
        console.log("No hay token, redirigiendo a login");
        return -1;
    }

    const authenticatedUserId = await getAuthenticatedUserId(token);

    if (authenticatedUserId instanceof Response) {
        // Si la autenticación falla, redirigir al login.
        console.log("Autenticación fallida, redirigiendo a login");
        return -1;
    }

    return authenticatedUserId;
}