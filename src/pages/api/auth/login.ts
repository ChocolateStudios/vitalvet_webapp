import type { APIRoute } from 'astro';
import { SaveUserResource } from '@/contexts/auth/server/interfaces/api/resources/save-user.resource';
import { UsersRepository } from '@/contexts/auth/server/infrastructure/repositories/users.repository';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {

    try {
        const body = await request.json();

        const { username, password } = body;
        if (!username || !password) {
            return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
        }
        const resource = new SaveUserResource(username, password);
        const authenticatedUser = await UsersRepository.loginUser(resource);

        // Establecemos el token en una cookie segura
        cookies.set('token', authenticatedUser.token, {
            httpOnly: false, // TODO: cambiar a true
            secure: import.meta.env.PROD, // Solo en HTTPS para producción
            path: '/',
            maxAge: 60 * 60 * 24 * 30, // 30 días
        });

        return new Response(JSON.stringify(authenticatedUser), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
