import type { ImagePerMedicalAppointment } from "@/contexts/medical_histories/server/models/image-per-medical-appointment.model";
import { equalTo, get, orderByChild, push, query, ref, remove, runTransaction, set } from "firebase/database";
import { MEDICAL_APPOINTMENTS_PATH } from "@/contexts/medical_histories/server/infrastructure/repositories/medical-appointments.repository";
import type { SaveMedicalAppointmentImageResource } from "@/contexts/medical_histories/server/interfaces/api/resources/save-medical-appointment-image.resource";
import { db } from "@/firebase/client";
import { MedicalAppointmentImageResource } from "@/contexts/medical_histories/server/interfaces/api/resources/medical-appointment-image.resource";

const IMAGE_PER_MEDICAL_APPOINTMENT_PATH = 'image_per_medical_appointments';

export class ImagePerMedicalAppointmentRepository {

    static async addImage(medicalAppointmentId: string, data: SaveMedicalAppointmentImageResource): Promise<MedicalAppointmentImageResource> {
        const newImage = data.toModel();
        newImage.medicalAppointmentId = medicalAppointmentId;

        const imagesCollectionRef = ref(db, IMAGE_PER_MEDICAL_APPOINTMENT_PATH);
        const newImageRef = push(imagesCollectionRef);

        const imageId = newImageRef.key;
        if (!imageId) {
            throw new Error('Could not generate ID for new image.');
        }

        newImage.id = imageId;

        const dataToSave = {
            medicalAppointmentId: newImage.medicalAppointmentId,
            imageName: newImage.imageName,
            imageUrl: newImage.imageUrl,
            createdAt: newImage.createdAt.toISOString(),
            updatedAt: newImage.updatedAt.toISOString(),
        };

        await set(newImageRef, dataToSave);

        const appointmentImagesCounterRef = ref(db, `${MEDICAL_APPOINTMENTS_PATH}/${medicalAppointmentId}/imagesCount`);
        await runTransaction(appointmentImagesCounterRef, (currentCount) => {
            return (currentCount || 0) + 1;
        });

        return MedicalAppointmentImageResource.fromModel(newImage);
    }

    static async deleteImage(medicalAppointmentId: string, imageId: string): Promise<void> {
        const imageRef = ref(db, `${IMAGE_PER_MEDICAL_APPOINTMENT_PATH}/${imageId}`);
        const snapshot = await get(imageRef);

        if (!snapshot.exists()) {
            throw new Error(`Image not found with id ${imageId}`);
        }

        const appointmentImagesCounterRef = ref(db, `${MEDICAL_APPOINTMENTS_PATH}/${medicalAppointmentId}/imagesCount`);
        await runTransaction(appointmentImagesCounterRef, (currentCount) => {
            return (currentCount || 0) > 0 ? currentCount - 1 : 0;
        });

        await remove(imageRef);
    }

    static async getImagesByMedicalAppointmentId(medicalAppointmentId: string): Promise<MedicalAppointmentImageResource[]> {
        const imagesRef = ref(db, IMAGE_PER_MEDICAL_APPOINTMENT_PATH);
        const queryByMedicalAppointmentId = query(imagesRef, orderByChild('medicalAppointmentId'), equalTo(medicalAppointmentId));

        const snapshot = await get(queryByMedicalAppointmentId);
        if (!snapshot.exists()) return [];

        const imagesData = snapshot.val();

        const imagesList: ImagePerMedicalAppointment[] = Object.keys(imagesData).map(key => ({
            ...imagesData[key],
            id: key,
            createdAt: new Date(imagesData[key].createdAt),
            updatedAt: new Date(imagesData[key].updatedAt),
        }));

        return imagesList.map(image => MedicalAppointmentImageResource.fromModel(image));
    }
}
