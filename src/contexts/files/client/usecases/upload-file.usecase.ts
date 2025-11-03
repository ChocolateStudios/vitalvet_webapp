import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";

export async function uploadFile(file: SaveFileResource, path?: string): Promise<UsecaseResult<any>> {
    try {
        const formData = new FormData();
        formData.append("filename", file.fileName);
        formData.append("extension", file.fileExtension);
        formData.append("contentType", file.fileContentType);
        formData.append("size", file.fileSize.toString());
        formData.append("path", file.storagePath);

        if (file.fileContent) {
            formData.append("file", file.fileContent);
        }

        const response = await fetch(path || `/api/files`, {
            method: 'POST',
            body: formData,
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo subir el archivo",
            };
        }

        return {
            success: true,
            data: await response.json(),
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}