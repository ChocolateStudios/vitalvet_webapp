import { getAuthenticatedUserId } from "@/contexts/_shared/server/application/usecases/get-authenticated-user-id";
import { defineMiddleware } from "astro:middleware";

const excludedRoutes = ['/app', '/app/login', '/app/register', '/app/recover', '/api/auth/login', , '/api/auth/register', , '/api/auth/recover'];

export const onRequest = defineMiddleware((context, next) => {
    const { pathname } = context.url;
    // console.log(pathname)

    // Permitir rutas excluidas sin aplicar el middleware
    if (excludedRoutes.includes(pathname)) {
        return next();
    }

    const token = context.cookies.get('token')?.value;
    // console.log('token ', token)

    const authenticatedUserId = getAuthenticatedUserId(token);
    // console.log('ahiva:', authenticatedUserId)
    // if authenticatedUserId is Response, return Response
    if (authenticatedUserId instanceof Response) {
        // return authenticatedUserId;
        // return next("/app/login"); // Redirigir si no está autenticado
        return new Response(null, {
            status: 302,
            headers: { Location: '/app/login' },
        });
    }

    context.locals.authenticatedUserId = authenticatedUserId;

    return next(); // Continuar con la petición
});