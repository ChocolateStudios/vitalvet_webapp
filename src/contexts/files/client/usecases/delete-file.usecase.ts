import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export async function deletePet(fileId: string): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`/api/files/${fileId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo eliminar el archivo",
            };
        }

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}