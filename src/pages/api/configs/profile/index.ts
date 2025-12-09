import type { APIRoute } from "astro";
import { getProfileConfig } from "@/contexts/configs/server/application/get-profile-config.usecase";
import { saveProfileConfig } from "@/contexts/configs/server/application/save-profile-config.usecase";

export const GET: APIRoute = async ({ url }) => {
    const profileId = url.searchParams.get("profileId");

    if (!profileId) {
        return new Response(JSON.stringify({ success: false, message: "Profile ID required" }), { status: 400 });
    }

    const result = await getProfileConfig(profileId);

    // It's okay if config is null (not set yet), still a success 200
    if (!result.success) {
        return new Response(JSON.stringify(result), { status: 500 });
    }

    return new Response(JSON.stringify(result), { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { profileId, modeId, userId } = body;

        if (!profileId || !modeId) {
            return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), { status: 400 });
        }

        const result = await saveProfileConfig({ profileId, modeId, userId });

        if (!result.success) {
            return new Response(JSON.stringify(result), { status: 500 });
        }

        return new Response(JSON.stringify(result), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ success: false, message: "Invalid request" }), { status: 400 });
    }
};
