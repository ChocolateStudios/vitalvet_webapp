import { getAuthenticatedUserId } from "./get-authenticated-user-id";

export function getAuthenticatedUserIdOrRedirect(Astro: any): string | number
{
    // 1. Obtener el token de la cookie en el servidor.
    const token = Astro.cookies.get('__session')?.value;

    if (!token) {
        // Si no hay token, redirigir al login.
        console.log("No hay token, redirigiendo a login");
        return Astro.redirect('/auth/login');
    }

    const authenticatedUserId = getAuthenticatedUserId(token);

    if (authenticatedUserId instanceof Response) {
        // Si la autenticación falla, redirigir al login.
        console.log("Autenticación fallida, redirigiendo a login");
        return Astro.redirect('/auth/login');
    }

    return authenticatedUserId;
}