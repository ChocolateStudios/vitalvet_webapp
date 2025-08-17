import type { APIRoute } from 'astro';
import { SaveUserResource } from '@/contexts/auth/server/interfaces/api/resources/save-user.resource';
import { UsersRepository } from '@/contexts/auth/server/infrastructure/repositories/users.repository';
import { loginUser } from '@/contexts/auth/server/application/usecases/login-user.usecase';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {

    try {
        const body = await request.json();
        const authenticatedUser = await loginUser(body);

        // Establecemos el token en una cookie segura
        cookies.set('__session', authenticatedUser.data.token, {
            httpOnly: true,
            secure: import.meta.env.PROD, // Solo en HTTPS para producción
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 días
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
