import type { APIRoute } from "astro";
import { uploadFile } from "@/contexts/files/server/application/usecases/upload-file.usecase";
import { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        console.log(formData);

        const fileContent = formData.get("file") as globalThis.File | null;
        if (!fileContent) {
            return new Response(JSON.stringify({ message: "File not found in form data" }), { status: 400 });
        }

        const fileName = formData.get("filename") as string;
        const extension = formData.get("extension") as string;
        const contentType = formData.get("contentType") as string;
        const size = formData.get("size") as string;
        const storagePath = formData.get("path") as string;

        const resource = new SaveFileResource(fileContent, fileName, extension, contentType, Number(size), storagePath);

        console.log(resource);

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