import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SaveMedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/save-medical-appointment.resource";

export async function createMedicalAppointment(petId: string, medicalAppointment: SaveMedicalAppointmentResource, baseUrl: string = ''): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`${baseUrl}/api/pets/${petId}/medical-appointments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(medicalAppointment),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo crear la cita médica",
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