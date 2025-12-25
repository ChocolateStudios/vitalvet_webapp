import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { FilePerEntityResource } from "@/contexts/files/server/interfaces/api/resources/file-per-entity.resource";

export async function getMedicalAppointmentDocuments(
    petId: string,
    medicalAppointmentId: string
): Promise<UsecaseResult<FilePerEntityResource[]>> {
    try {
        const response = await fetch(
            `/api/pets/${petId}/medical-appointments/${medicalAppointmentId}/documents`
        );

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudieron obtener los documentos",
            };
        }

        const data = await response.json();

        return {
            success: true,
            data: data,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}
