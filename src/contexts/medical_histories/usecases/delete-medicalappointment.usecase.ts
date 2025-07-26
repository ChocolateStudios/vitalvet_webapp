import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/services/repositories/medical-appointments.repository";
import type { MedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/medical-appointment.resource";

export async function deleteMedicalAppointment(petId: string, medicalAppointmentId: string, baseUrl: string = ''): Promise<UsecaseResult<any>> {
    // let existingMedicalAppointment: MedicalAppointmentResource;
    
    // try {
    //     existingMedicalAppointment = await MedicalAppointmentsRepository.deleteMedicalAppointment(medicalAppointmentId);
    // } catch (error) {
    //     return {
    //         success: false,
    //         errorMessage: (error as Error).message,
    //     };
    // }

    // if (!existingMedicalAppointment) {
    //     return {
    //         success: false,
    //         errorMessage: "No se pudo eliminar la cita médica",
    //     };
    // }

    // return {
    //     success: true,
    // }
    try {
        const response = await fetch(`${baseUrl}/api/pets/${petId}/medical-appointments/${medicalAppointmentId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo eliminar la cita médica",
            };
        }

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}