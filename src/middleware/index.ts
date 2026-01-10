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

// Derivamos las rutas de redirección (para usuarios autenticados) de las rutas excluidas.
// Cualquier ruta excluida que empiece por '/app' (ej. /app, /app/login) redirigirá a home si ya estás logueado.
const redirectRoutes = excludedRoutes.filter(path => path.startsWith('/app'));

export const onRequest = defineMiddleware(async (context, next) => {
    const { pathname } = context.url;
    // console.log('pathname: ' + pathname)
    // console.log('excludedRoutes: ' + excludedRoutes)

    const isExcluded = excludedRoutes.includes(pathname);
    const isRedirectTarget = redirectRoutes.includes(pathname);

    // Si la ruta está explícitamente excluida Y NO es una ruta de redirección condicional, la dejamos pasar.
    // Esto cubre casos como '/' o '/api/auth/login' que no deben redirigir aunque estés logueado (APIs).
    // Pero si es '/app/login' (que es isRedirectTarget), pasará a la siguiente validación.
    if (isExcluded && !isRedirectTarget) {
        return next();
    }

    // Si la ruta no está dentro del área protegida '/app/', también la dejamos pasar.
    if (!pathname.startsWith('/app') && !pathname.startsWith('/api')) {
        return next();
    }

    const token = context.cookies.get('__session')?.value;
    // console.log('token ', token)

    const authenticatedUserId = await getAuthenticatedUserId(token);

    // if authenticatedUserId is Response, return Response
    if (authenticatedUserId instanceof Response) {
        // Si no está autenticado, pero es una ruta excluida (ej. /app/login), permitimos el acceso.
        if (isExcluded) {
            return next();
        }

        // Si está autenticado y está en una ruta de redirección (ej. /app/login, /app), redirigimos a home.
        if (isRedirectTarget) {
            return context.redirect('/app/home');
        }

        // Si es una ruta protegida, redirigimos al login.
        return next("/app/login");
    }

    context.locals.authenticatedUserId = authenticatedUserId;

    // Si está autenticado y está en una ruta de redirección (ej. /app/login, /app), redirigimos a home.
    if (isRedirectTarget) {
        return context.redirect('/app/home');
    }

    return next(); // Continuar con la petición
});