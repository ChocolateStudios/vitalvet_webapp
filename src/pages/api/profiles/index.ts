import type { APIRoute } from "astro";
import { getProfile } from "@/contexts/profiles/server/application/usecases/get-profile.usecase";

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
    return await getProfile(locals.authenticatedUserId);
};