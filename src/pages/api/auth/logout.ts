import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect }) => {
    cookies.delete('__session', { path: '/' });
    return redirect('/app/login');
};
