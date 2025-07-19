import type { APIRoute } from 'astro';
import { UsersApi } from '@/contexts/auth/services/api/users.api';
import { SaveUserResource } from '@/contexts/auth/services/resources/save-user.resource';

export const prerender = false;

export const POST: APIRoute = async ({ request, params }) => {

    try {
        const body = await request.json();

        const { username, password } = body;
        if (!username || !password) {
            return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
        }
        const resource = new SaveUserResource(username, password);
        const authenticatedUser = await UsersApi.loginUser(resource);
        return new Response(JSON.stringify(authenticatedUser), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
