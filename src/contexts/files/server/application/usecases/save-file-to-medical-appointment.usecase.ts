import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";
import { uploadFile } from "@/contexts/files/server/application/usecases/upload-file.usecase";
import { ImagePerEntityRepository } from "@/contexts/files/server/infrastructure/repositories/file-per-entity.repository";
import { SaveFilePerEntityResource } from "@/contexts/files/server/interfaces/api/resources/save-file-per-entity.resource";
import type { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";
import type { FilePerEntityResource } from "@/contexts/files/server/interfaces/api/resources/file-per-entity.resource";

const MEDICAL_APPOINTMENT_ENTITY_ID = "medical_appointment";

export async function saveFileToMedicalAppointment(
    file: SaveFileResource,
    petId: string | number,
    medicalAppointmentId: string | number
): Promise<UsecaseResult<FilePerEntityResource>> {
    try {
        // Step 1: Upload file to Firebase Storage
        const uploadResult = await uploadFile(file);

        if (!uploadResult.success || !uploadResult.data) {
            return {
                success: false,
                errorMessage: uploadResult.errorMessage || "Error al subir el archivo a Storage",
            };
        }

        const uploadedFile = uploadResult.data;

        // Step 2: Save file metadata to Realtime Database
        const filePerEntityResource = new SaveFilePerEntityResource(
            uploadedFile.fileName + '.' + uploadedFile.fileExtension,
            uploadedFile.publicURL,
            MEDICAL_APPOINTMENT_ENTITY_ID,
            medicalAppointmentId
        );

        const savedFile = await ImagePerEntityRepository.addFile(filePerEntityResource);

        return {
            success: true,
            data: savedFile,
        };
    } catch (error) {
        console.error("Error al guardar archivo en cita médica:", error);
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Ocurrió un error inesperado al guardar el archivo.";
        return {
            success: false,
            errorMessage: errorMessage,
        };
    }
}
