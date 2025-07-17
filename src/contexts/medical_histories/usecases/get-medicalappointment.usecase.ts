import type { MedicalAppointment } from "@/contexts/medical_histories/models/medical-appointment.model";
import { MedicalAppointmentsApiMock } from "@/contexts/medical_histories/services/mock/medical-appointments.mock";
import type { MedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/medical-appointment.resource";
import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import { MedicalAppointmentsRepository } from "../services/repositories/medical-appointments.repository";

interface MedicalAppointmentInfo extends MedicalAppointment {
    appointmentNumber: number,
}

export async function getMedicalAppointment(medicalAppointmentId: string): Promise<UsecaseResult<MedicalAppointmentInfo>> {
    let medicalAppointment: MedicalAppointmentResource;
    
    try {
        medicalAppointment = await MedicalAppointmentsRepository.getMedicalAppointment(medicalAppointmentId);
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        }
    }

    if (!medicalAppointment) {
        return {
            success: false,
            errorMessage: 'No se encontró la cita médica',
        }
    }
    
    return {
        data: {
            ...medicalAppointment,
            appointmentNumber: Number(medicalAppointmentId) + 1,
        },
        success: true,
    };
}

export function getMedicalAppointmentMocked(medicalAppointmentId: number): MedicalAppointmentInfo {
    const medicalAppointment: MedicalAppointmentResource = MedicalAppointmentsApiMock.getMedicalAppointment(medicalAppointmentId);

    if (!medicalAppointment) {
        // TODO: return error message
    }
    
    return {
        ...medicalAppointment,
        appointmentNumber: Number(medicalAppointmentId) + 1,
    };
}