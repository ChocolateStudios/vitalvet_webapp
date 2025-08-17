import { getAuthenticatedUserId } from "@/contexts/_shared/server/application/usecases/get-authenticated-user-id";
import { defineMiddleware } from "astro:middleware";

// Definimos las rutas base que no requieren autenticación.
const baseExcludedRoutes = [
    '',
    '/',
    '/app',
    '/app/login',
    '/app/register',
    '/app/recover',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/recover'
];

// Generamos un nuevo array que incluye cada ruta y su variante con una barra ("/") al final.
// Esto asegura que tanto '/app/login' como '/app/login/' se traten como rutas excluidas.
const excludedRoutes = baseExcludedRoutes.flatMap(path => path === '/' ? [path] : [path, `${path}/`]);

export const onRequest = defineMiddleware((context, next) => {
    const { pathname } = context.url;
    // console.log('pathname: ' + pathname)
    // console.log('excludedRoutes: ' + excludedRoutes)

    // Si la ruta está explícitamente excluida, la dejamos pasar.
    if (excludedRoutes.includes(pathname)) {
        return next();
    }

    // Si la ruta no está dentro del área protegida '/app/', también la dejamos pasar.
    if (!pathname.startsWith('/app/') && !pathname.startsWith('/api/')) {
        return next();
    }

    const token = context.cookies.get('__session')?.value;
    // console.log('token ', token)

    const authenticatedUserId = getAuthenticatedUserId(token);
    // console.log('ahiva:', authenticatedUserId)
    // if authenticatedUserId is Response, return Response
    if (authenticatedUserId instanceof Response) {
        // return authenticatedUserId;
        return next("/app/login"); // Redirigir si no está autenticado
        // return new Response(null, {
        //     status: 302,
        //     headers: { Location: '/app/login' },
        // });
    }

    context.locals.authenticatedUserId = authenticatedUserId;

    return next(); // Continuar con la petición
});