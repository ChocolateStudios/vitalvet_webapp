import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import type { SaveMedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/save-medical-appointment.resource";
import type { MedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/medical-appointment.resource";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/services/repositories/medical-appointments.repository";

export async function updateMedicalAppointment(medicalAppointmentId: string, medicalAppointment: SaveMedicalAppointmentResource): Promise<UsecaseResult<any>> {
    let existingMedicalAppointment: MedicalAppointmentResource;
    
    try {
        existingMedicalAppointment = await MedicalAppointmentsRepository.updateMedicalAppointment(medicalAppointmentId, medicalAppointment);
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }

    if (!existingMedicalAppointment) {
        return {
            success: false,
            errorMessage: "No se pudo actualizar la cita médica",
        };
    }

    return {
        success: true,
    }
}