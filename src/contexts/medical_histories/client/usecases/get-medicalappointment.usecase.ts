import type { MedicalAppointment } from "@/contexts/medical_histories/server/models/medical-appointment.model";
import type { MedicalAppointmentResource } from "@/contexts/medical_histories/server/interfaces/api/resources/medical-appointment.resource";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

interface MedicalAppointmentInfo extends MedicalAppointment {
    appointmentNumber: number,
}

export async function getMedicalAppointment(petId: string, medicalAppointmentId: string, baseUrl: string = ''): Promise<UsecaseResult<MedicalAppointmentInfo>> {
    try {
        const response = await fetch(`${baseUrl}/api/pets/${petId}/medical-appointments/${medicalAppointmentId}`);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || `Medical appointment no encontrado con id ${medicalAppointmentId} no encontrada para la mascota con id ${petId}`,
            };
        }

        const existingMedicalAppointment: MedicalAppointmentResource = await response.json();

        return {
            data: {
                ...existingMedicalAppointment,
            },
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}