import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SaveMedicalAppointmentResource } from "@/contexts/medical_histories/server/interfaces/api/resources/save-medical-appointment.resource";
import type { MedicalAppointmentResource } from "@/contexts/medical_histories/server/interfaces/api/resources/medical-appointment.resource";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/server/infrastructure/repositories/medical-appointments.repository";

export async function updateMedicalAppointment(petId: string, medicalAppointmentId: string, medicalAppointment: SaveMedicalAppointmentResource, baseUrl: string = ''): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`${baseUrl}/api/pets/${petId}/medical-appointments/${medicalAppointmentId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicalAppointment),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo actualizar la cita médica",
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