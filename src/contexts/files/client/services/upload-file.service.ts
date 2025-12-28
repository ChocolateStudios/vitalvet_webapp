import type { ServiceResult } from "@/contexts/_shared/client/services/service-result";
import type { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";

// TODO: en pet.page.astro hay que agregar en el src del img al final el datetime now para que siempre recargue la imagen
// Hay que documentar bien en los comentarios el cookies '__sesion' y esta forma de deserializar el buffer por culpa de firebase
export async function uploadFile(file: SaveFileResource, path?: string): Promise<ServiceResult<any>> {
    try {
        const formData = new FormData();
        file.fileName && formData.append("filename", file.fileName);
        file.fileExtension && formData.append("extension", file.fileExtension);
        file.fileContentType && formData.append("contentType", file.fileContentType);
        file.fileSize && formData.append("size", file.fileSize.toString());
        file.storagePath && formData.append("path", file.storagePath);
        file.fileContent && file.fileContent instanceof globalThis.File && formData.append("file", file.fileContent);

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