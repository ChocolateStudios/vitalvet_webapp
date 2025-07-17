import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import type { SaveMedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/save-medical-appointment.resource";
import type { MedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/medical-appointment.resource";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/services/repositories/medical-appointments.repository";

export async function createMedicalAppointment(petId: string, medicalAppointment: SaveMedicalAppointmentResource): Promise<UsecaseResult<any>> {
    let newMedicalAppointment: MedicalAppointmentResource;
    
    try {
        newMedicalAppointment = await MedicalAppointmentsRepository.registerMedicalAppointment(petId, medicalAppointment);
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }

    if (!newMedicalAppointment) {
        return {
            success: false,
            errorMessage: "No se pudo crear la cita médica",
        };
    }

    return {
        success: true,
    }
}