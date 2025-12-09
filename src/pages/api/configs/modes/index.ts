import type { APIRoute } from "astro";
import { getGlobalModes } from "@/contexts/configs/server/application/get-global-modes.usecase";

export const GET: APIRoute = async () => {
    const result = await getGlobalModes();

    if (!result.success) {
        return new Response(JSON.stringify(result), { status: 500 });
    }

    return new Response(JSON.stringify(result), { status: 200 });
};
