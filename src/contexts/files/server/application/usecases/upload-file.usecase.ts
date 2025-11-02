import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/client";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";

export async function uploadFile(file: SaveFileResource): Promise<UsecaseResult<any>> {
    try {
        if (!file) {
            throw new Error("El archivo es requerido.");
        }

        const storageRef = ref(storage, `${file.storagePath}/${file.fileName}.${file.fileExtension}`);

        // Upload the file
        if (!file.fileContent) {
            throw new Error("El contenido del archivo es requerido.");
        }

        const snapshot = await uploadBytes(storageRef, file.fileContent as Blob);

        // Get the public URL
        const publicURL = await getDownloadURL(snapshot.ref);

        // Construct our application's File model
        const uploadedFile = {
            id: "",
            fileName: file.fileName,
            fileExtension: file.fileExtension,
            storagePath: snapshot.ref.fullPath,
            publicURL: publicURL,
            contentType: snapshot.metadata.contentType,
            size: snapshot.metadata.size,
            createdAt: new Date(snapshot.metadata.timeCreated),
            updatedAt: new Date(snapshot.metadata.updated),
        };

        console.log(uploadedFile)
        return { success: true, data: uploadedFile };
    } catch (error) {
        console.error("Error al subir el archivo:", error);
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado al subir el archivo.";
        return { success: false, errorMessage: errorMessage };
    }
}