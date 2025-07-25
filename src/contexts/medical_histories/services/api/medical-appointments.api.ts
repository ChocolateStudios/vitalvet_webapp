import { db } from "@/firebase/client";
import { get, push, query, ref, set, orderByChild, equalTo } from "firebase/database";
import type { MedicalAppointment } from "@/contexts/medical_histories/models/medical-appointment.model";
import type { SaveMedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/save-medical-appointment.resource";
import { MedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/medical-appointment.resource";

const MEDICAL_APPOINTMENTS_PATH = 'medical-appointments';

export class MedicalAppointmentsApi {
    static async createMedicalAppointment(petId: string, data: SaveMedicalAppointmentResource): Promise<MedicalAppointmentResource> {
        const newAppointment: MedicalAppointment = data.toModel();
        newAppointment.petId = petId;

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

    static async getAllMedicalAppointmentsByPetId(petId: string): Promise<MedicalAppointmentResource[]> {
        const appointmentsRef = ref(db, MEDICAL_APPOINTMENTS_PATH);
        const q = query(appointmentsRef, orderByChild('petId'), equalTo(petId));
        const snapshot = await get(q);

        if (!snapshot.exists()) {
            return [];
        }

        const appointmentsData = snapshot.val();
        return Object.keys(appointmentsData).map(key => MedicalAppointmentResource.fromModel({ ...appointmentsData[key], id: key }));
    }
}
