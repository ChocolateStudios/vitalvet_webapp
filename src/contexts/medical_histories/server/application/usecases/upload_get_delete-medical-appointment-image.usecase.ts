import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";
import { getStreamFile } from "@/contexts/files/server/application/usecases/get-stream-file.usecase";
import { uploadFile } from "@/contexts/files/server/application/usecases/upload-file.usecase";
import type { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";
import { storage } from '@/firebase/client';
import { ref, listAll, getMetadata, getStream, deleteObject } from 'firebase/storage';
import path from 'path';

const MEDICAL_APPOINTMENTS_STORAGE_ROUTE = 'medical_appointments';

export async function uploadMedicalAppointmentImage(medicalAppointmentId: string, file: SaveFileResource): Promise<UsecaseResult<any>> {
    const storagePath = `${MEDICAL_APPOINTMENTS_STORAGE_ROUTE}/${medicalAppointmentId}`;
    file.storagePath = storagePath;

    return uploadFile(file);
}

export async function getMedicalAppointmentImage(medicalAppointmentId: string, imageId: string): Promise<UsecaseResult<any>> {
    const storagePath = `${MEDICAL_APPOINTMENTS_STORAGE_ROUTE}/${medicalAppointmentId}/${imageId}`;
    const result = await getStreamFile(storagePath);

    return result;
}

export async function getAllMedicalAppointmentImages(medicalAppointmentId: string): Promise<UsecaseResult<any[]>> {
    const storagePath = `${MEDICAL_APPOINTMENTS_STORAGE_ROUTE}/${medicalAppointmentId}`;
    const dirRef = ref(storage, storagePath);

    try {
        const res = await listAll(dirRef);
        const files = await Promise.all(res.items.map(async (itemRef) => {
            const metadata = await getMetadata(itemRef);
            const stream = getStream(itemRef);
            return {
                id: path.parse(itemRef.name).name,
                fullName: itemRef.name,
                stream,
                metadata
            };
        }));

        return { success: true, data: files };
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        return {
            success: false,
            errorMessage: errorMessage,
        }
    }
}

export async function deleteMedicalAppointmentImage(medicalAppointmentId: string, imageId: string): Promise<UsecaseResult<void>> {
    const directoryPath = `${MEDICAL_APPOINTMENTS_STORAGE_ROUTE}/${medicalAppointmentId}`;
    const dirRef = ref(storage, directoryPath);

    try {
        const res = await listAll(dirRef);
        const foundItem = res.items.find(itemRef => {
            return path.parse(itemRef.name).name === imageId;
        });

        if (foundItem) {
            await deleteObject(foundItem);
            return { success: true };
        }

        return {
            success: false,
            errorMessage: 'Image not found',
        };
    } catch (error: any) {
        console.warn("Advertencia al eliminar archivo:", error);
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Ocurrió un error al eliminar el archivo.";
        return { success: false, errorMessage: errorMessage };
    }
}