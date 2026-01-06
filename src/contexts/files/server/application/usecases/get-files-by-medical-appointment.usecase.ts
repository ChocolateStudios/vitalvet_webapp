import type { ServiceResult } from "@/contexts/_shared/client/services/service-result";
import { ImagePerEntityRepository } from "@/contexts/files/server/infrastructure/repositories/file-per-entity.repository";
import type { FilePerEntityResource } from "@/contexts/files/server/interfaces/api/resources/file-per-entity.resource";

const MEDICAL_APPOINTMENT_ENTITY_ID = "7";

export async function getFilesByMedicalAppointment(
    petId: string | number,
    medicalAppointmentId: string | number
): Promise<ServiceResult<FilePerEntityResource[]>> {
    try {
        const files = await ImagePerEntityRepository.getFilesByEntityId(
            MEDICAL_APPOINTMENT_ENTITY_ID,
            medicalAppointmentId
        );

        return {
            success: true,
            data: files,
        };
    } catch (error) {
        console.error("Error al obtener archivos de la cita médica:", error);
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado al obtener los archivos.";
        return {
            success: false,
            errorMessage: errorMessage,
        };
    }
}
