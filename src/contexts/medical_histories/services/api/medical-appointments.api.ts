import { db } from "@/firebase/client";
import { get, push, query, ref, set, orderByChild, equalTo, update, remove } from "firebase/database";
import type { MedicalAppointment } from "@/contexts/medical_histories/models/medical-appointment.model";
import type { SaveMedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/save-medical-appointment.resource";
import { MedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/medical-appointment.resource";

const MEDICAL_APPOINTMENTS_PATH = 'medical_appointments';

export class MedicalAppointmentsApi {
    static async createMedicalAppointment(petId: string, data: SaveMedicalAppointmentResource): Promise<MedicalAppointmentResource> {
        const newAppointment: MedicalAppointment = data.toModel();
        newAppointment.stringPetId = petId;

        const appointmentsCollectionRef = ref(db, MEDICAL_APPOINTMENTS_PATH);
        const newAppointmentRef = push(appointmentsCollectionRef);
        const appointmentId = newAppointmentRef.key;

        if (!appointmentId) {
            throw new Error('No se pudo generar un ID para la nueva cita médica.');
        }

        newAppointment.stringId = appointmentId;
        await set(newAppointmentRef, newAppointment);
        return MedicalAppointmentResource.fromModel(newAppointment);
    }

    static async getMedicalAppointmentById(petId: string, medicalAppointmentId: string): Promise<MedicalAppointmentResource> {
        // Para obtener el número de cita, primero necesitamos todas las citas de la mascota y ordenarlas.
        const allAppointments = await this.getAllMedicalAppointmentsByPetId(petId);

        // Buscamos la cita específica en la lista ya ordenada.
            console.log(allAppointments)
        const medicalAppointment = allAppointments.find(appointment => appointment.stringId === medicalAppointmentId);

        if (!medicalAppointment) {
            throw new Error(`Cita médica no encontrada con el id ${medicalAppointmentId} para la mascota con id ${petId}`);
        }

        return medicalAppointment;
    }

    static async getAllMedicalAppointmentsByPetId(petId: string): Promise<MedicalAppointmentResource[]> {
        const appointmentsRef = ref(db, MEDICAL_APPOINTMENTS_PATH);
        const q = query(appointmentsRef, orderByChild('petId'), equalTo(petId));

        const snapshot = await get(q);

        if (!snapshot.exists()) {
            return [];
        }

        const appointmentsData = snapshot.val();
        
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

        return this.getMedicalAppointmentById(petId, medicalAppointmentId);
    }

    static async deleteMedicalAppointment(petId: string, medicalAppointmentId: string): Promise<MedicalAppointmentResource> {
        const medicalAppointmentToDelete = await this.getMedicalAppointmentById(petId, medicalAppointmentId); // Obtenemos el objeto antes de borrarlo para poder devolverlo
        const medicalAppointmentRef = ref(db, `${MEDICAL_APPOINTMENTS_PATH}/${medicalAppointmentId}`);
        await remove(medicalAppointmentRef);
        return medicalAppointmentToDelete;
    }
}
