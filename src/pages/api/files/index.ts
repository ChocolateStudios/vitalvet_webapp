import type { APIRoute } from "astro";
import { uploadFile } from "@/contexts/files/server/application/usecases/upload-file.usecase";
import { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();

        if (!formData.get("file")) {
            return new Response(JSON.stringify({ message: "File not found in form data" }), { status: 400 });
        }

        const resource = SaveFileResource.fromFormData({ formData });

        const result = await uploadFile(resource);

        if (result.success) {
            return new Response(JSON.stringify(result.data), { 
                status: 201, 
                headers: { 'Content-Type': 'application/json' } 
            });
        } else {
            return new Response(JSON.stringify({ message: result.errorMessage }), { status: 500 });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};