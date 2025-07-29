import type { MedicalAppointment } from "@/contexts/medical_histories/server/models/medical-appointment.model";
import { db } from "@/firebase/client";
import { equalTo, get, orderByChild, push, query, ref, remove, runTransaction, set, update } from "firebase/database";
import type { SaveMedicalAppointmentResource } from "@/contexts/medical_histories/server/interfaces/api/resources/save-medical-appointment.resource";
import { MedicalAppointmentResource } from "@/contexts/medical_histories/server/interfaces/api/resources/medical-appointment.resource";
import { PETS_PATH } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";

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

        // Incrementa el contador de citas médicas para la mascota usando una transacción
        const petCounterRef = ref(db, `${PETS_PATH}/${petId}/medicalAppointmentsCount`);
        await runTransaction(petCounterRef, (currentCount) => {
            return (currentCount || 0) + 1;
        });

        return MedicalAppointmentResource.fromModel(newMedicalAppointment);
    }

    static async updateMedicalAppointment(petId: string, medicalAppointmentId: string, data: SaveMedicalAppointmentResource): Promise<MedicalAppointmentResource> {
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

        return this.getMedicalAppointment(petId, medicalAppointmentId);
    }

    static async deleteMedicalAppointment(petId: string, medicalAppointmentId: string): Promise<MedicalAppointmentResource> {
        const medicalAppointmentToDelete = await this.getMedicalAppointment(petId, medicalAppointmentId); // Obtenemos el objeto antes de borrarlo para poder devolverlo
        const medicalAppointmentRef = ref(db, `${MEDICAL_APPOINTMENTS_PATH}/${medicalAppointmentId}`);

        // Decrementa el contador de citas médicas para la mascota usando una transacción
        const petCounterRef = ref(db, `${PETS_PATH}/${petId}/medicalAppointmentsCount`);
        await runTransaction(petCounterRef, (currentCount) => {
            // Aseguramos que el contador no sea negativo
            return (currentCount || 0) > 0 ? currentCount - 1 : 0;
        });
        
        await remove(medicalAppointmentRef);
        return medicalAppointmentToDelete;
    }

    static async getMedicalAppointment(petId: string, medicalAppointmentId: string): Promise<MedicalAppointmentResource> {
        // Para obtener el número de cita, primero necesitamos todas las citas de la mascota y ordenarlas.
        const allAppointments = await this.getAllMedicalAppointmentsByPetId(petId);

        // Buscamos la cita específica en la lista ya ordenada.
        const medicalAppointment = allAppointments.find(appointment => appointment.stringId === medicalAppointmentId);

        if (!medicalAppointment) {
            throw new Error(`Cita médica no encontrada con el id ${medicalAppointmentId} para la mascota con id ${petId}`);
        }

        return medicalAppointment;
    }

    static async getAllMedicalAppointmentsByPetId(petId: string): Promise<MedicalAppointmentResource[]> {
        const medicalAppointmentsRef = ref(db, MEDICAL_APPOINTMENTS_PATH);

        // Construye la consulta para filtrar por petId en el servidor
        const queryByPetId = query(medicalAppointmentsRef, orderByChild('petId'), equalTo(petId));

        const snapshot = await get(queryByPetId);
        if (!snapshot.exists()) return [];

        const appointmentsData  = snapshot.val();

        // 1. Convertir el objeto de citas en un array
        const appointmentsList: MedicalAppointment[] = Object.keys(appointmentsData).map(key => ({ 
            ...appointmentsData[key], 
            id: key,
            stringId: key,
            createdAt: new Date(appointmentsData[key].createdAt),
            updatedAt: new Date(appointmentsData[key].updatedAt),
        }));

        // 2. Ordenar el array por fecha de creación (ascendente)
        appointmentsList.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

        // 3. Convertir el array de citas en un array de recursos
        return appointmentsList.map((appointment, index) => {
            const resource = MedicalAppointmentResource.fromModel(appointment);
            resource.appointmentNumber = index + 1;
            return resource;
        })
    }
}