import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { MedicalAppointmentResource } from "@/contexts/medical_histories/server/interfaces/api/resources/medical-appointment.resource";

interface MedicalAppointmentListItemInfo {
    id: number,
    appointmentNumber: number,
    createdAt: Date,
    doctorName: string,
}

export async function getAllMedicalAppointmentsByPetId(petId: string): Promise<UsecaseResult<MedicalAppointmentListItemInfo[]>> {
    try {
        const response = await fetch(`/api/pets/${petId}/medical-appointments`);

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudieron obtener las citas médicas",
            };
        }

        const medicalAppointments = await response.json();
        const medicalAppointmentsInfo = medicalAppointments.map((ma: MedicalAppointmentResource) => {
            return {
                id: ma.id,
                createdAt: ma.createdAt,
                appointmentNumber: ma.appointmentNumber,
                doctorName: "Doctor ejemplo",
            };
        });

        return {
            data: medicalAppointmentsInfo,
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}