import type { APIRoute } from 'astro';
import { loginUser } from '@/contexts/auth/server/application/usecases/login-user.usecase';
import { SaveUserResource } from '@/contexts/auth/server/interfaces/api/resources/save-user.resource';

export const prerender = false;

const expTime = import.meta.env.JWT_EXPIRATION_TIME;

export const POST: APIRoute = async ({ request, cookies }) => {

    try {
        const body = await request.json();
        const saveResource = SaveUserResource.fromJsonBody(body);
        const authenticatedUser = await loginUser(saveResource);

        // Establecemos el token en una cookie segura
        cookies.set('__session', authenticatedUser.data.token, {
            httpOnly: true,
            secure: import.meta.env.PROD, // Solo en HTTPS para producción
            path: '/',
            maxAge: 60 * 60 * 24 * expTime, // x días antes de expirar
        });
        authenticatedUser.data.token = '';

        return new Response(JSON.stringify(authenticatedUser.data), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
        // return new Response(null, { status: 302, headers: { 'Location': '/app/home' } });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error loging user:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
