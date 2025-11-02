import type { APIRoute } from "astro";
import { deleteFile } from "@/contexts/files/server/application/usecases/delete-file.usecase";

export const prerender = false;

export const DELETE: APIRoute = async ({ params }) => {
    try {
        const { fileId } = params;

        if (!fileId) {
            return new Response(JSON.stringify({ message: "File ID is required" }), { status: 400 });
        }

        const result = await deleteFile(fileId);

        if (result.success) {
            return new Response(null, { status: 204 });
        } else {
            return new Response(JSON.stringify({ message: result.errorMessage }), { status: 500 });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};