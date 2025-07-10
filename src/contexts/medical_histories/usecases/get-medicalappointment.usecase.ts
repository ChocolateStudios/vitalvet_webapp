import type { MedicalAppointment } from "../models/medical-appointment.model";
import { MedicalAppointmentsApiMock } from "../services/mock/medical-appointments.mock";

interface MedicalAppointmentInfo extends MedicalAppointment {
    appointmentNumber: number,
}

export function getMedicalAppointment(medicalAppointmentId: number): MedicalAppointmentInfo {
    const medicalAppointment = MedicalAppointmentsApiMock.getMedicalAppointment(medicalAppointmentId);

    if (!medicalAppointment) {
        // TODO: return error message
    }
    
    return {
        ...medicalAppointment,
        appointmentNumber: Number(medicalAppointmentId) + 1,
    };
}