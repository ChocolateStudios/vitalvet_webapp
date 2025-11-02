import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/firebase/client";

export async function deleteFile(path: string): Promise<UsecaseResult<void>> {
    try {
        if (!path) {
            throw new Error("La ruta del archivo es requerida.");
        }

        const storageRef = ref(storage, path);
        await deleteObject(storageRef);

        return { success: true };
    } catch (error) {
        // https://firebase.google.com/docs/storage/web/handle-errors
        // It's common for this to fail if the file doesn't exist, which can be okay.
        console.warn("Advertencia al eliminar archivo:", error);
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Ocurrió un error al eliminar el archivo.";
        return { success: false, errorMessage: errorMessage };
    }
}
