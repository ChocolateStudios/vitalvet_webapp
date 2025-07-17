import type { MedicalAppointment } from "@/contexts/medical_histories/models/medical-appointment.model";
import { db } from "@/firebase/client";
import { equalTo, get, orderByChild, push, query, ref, remove, set, update } from "firebase/database";
import type { SaveMedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/save-medical-appointment.resource";
import { MedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/medical-appointment.resource";

const MEDICAL_APPOINTMENTS_PATH = 'medical_appointments';

export class MedicalAppointmentsRepository {

    static async registerMedicalAppointment(petId: string, data: SaveMedicalAppointmentResource): Promise<MedicalAppointmentResource> {
        const newMedicalAppointment: MedicalAppointment = data.toModel();
        
        const medicalAppointmentsCollectionRef = ref(db, MEDICAL_APPOINTMENTS_PATH);
        const newMedicalAppointmentRef = push(medicalAppointmentsCollectionRef);

        const medicalAppointmentId = newMedicalAppointmentRef.key;
        if (!medicalAppointmentId) {
            throw new Error('No se pudo generar un ID para la nueva cita médica.');
        }

        newMedicalAppointment.stringId = medicalAppointmentId; // Asigna el ID único de Firebase

        // Firebase maneja mejor los timestamps como strings ISO o números
        const dataToSave = {
            ...data,
            petId: petId,
            createdAt: newMedicalAppointment.createdAt.toISOString(),
            updatedAt: newMedicalAppointment.updatedAt.toISOString(),
        };

        await set(newMedicalAppointmentRef, dataToSave);

        return MedicalAppointmentResource.fromModel(newMedicalAppointment);
    }

    static async updateMedicalAppointment(medicalAppointmentId: string, data: SaveMedicalAppointmentResource): Promise<MedicalAppointmentResource> {
        const medicalAppointmentRef = ref(db, `${MEDICAL_APPOINTMENTS_PATH}/${medicalAppointmentId}`);
        const snapshot = await get(medicalAppointmentRef);
        if (!snapshot.exists()) {
            throw new Error(`Cita médica no encontrada con el id ${medicalAppointmentId}`);
        }

        const dataToUpdate = {
            ...data,
            updatedAt: new Date().toISOString(),
        };
        
        await update(medicalAppointmentRef, dataToUpdate);

        return this.getMedicalAppointment(medicalAppointmentId);
    }

    static async deleteMedicalAppointment(medicalAppointmentId: string): Promise<MedicalAppointmentResource> {
        const medicalAppointmentToDelete = await this.getMedicalAppointment(medicalAppointmentId); // Obtenemos el objeto antes de borrarlo para poder devolverlo
        const medicalAppointmentRef = ref(db, `${MEDICAL_APPOINTMENTS_PATH}/${medicalAppointmentId}`);
        await remove(medicalAppointmentRef);
        return medicalAppointmentToDelete;
    }

    static async getMedicalAppointment(medicalAppointmentId: string): Promise<MedicalAppointmentResource> {
        const medicalAppointmentRef = ref(db, `${MEDICAL_APPOINTMENTS_PATH}/${medicalAppointmentId}`);
        const snapshot = await get(medicalAppointmentRef);

        if (!snapshot.exists()) {
            throw new Error(`Cita médica no encontrada con el id ${medicalAppointmentId}`);
        }

        const medicalAppointmentData = snapshot.val();
        const medicalAppointmentModel: MedicalAppointment = {
            ...medicalAppointmentData,
            id: medicalAppointmentId,
            createdAt: new Date(medicalAppointmentData.createdAt),
            updatedAt: new Date(medicalAppointmentData.updatedAt),
        };

        return MedicalAppointmentResource.fromModel(medicalAppointmentModel);
    }

    static async getAllMedicalAppointmentsByPetId(petId: string): Promise<MedicalAppointmentResource[]> {
        const medicalAppointmentsRef = ref(db, MEDICAL_APPOINTMENTS_PATH);

        // Construye la consulta para filtrar por petId en el servidor
        const queryByPetId = query(medicalAppointmentsRef, orderByChild('petId'), equalTo(petId));

        const snapshot = await get(queryByPetId);
        if (!snapshot.exists()) return [];

        const appointmentsData  = snapshot.val();
        return Object.keys(appointmentsData).map(key => {
            const medicalAppointmentData = appointmentsData[key];
            const medicalAppointmentModel: MedicalAppointment = {
                ...medicalAppointmentData,
                id: key,
                createdAt: new Date(medicalAppointmentData.createdAt),
                updatedAt: new Date(medicalAppointmentData.updatedAt),
            };
            return MedicalAppointmentResource.fromModel(medicalAppointmentModel);
        });
    }
}