import type { MedicalAppointmentResource } from "@/contexts/medical_histories/server/interfaces/api/resources/medical-appointment.resource";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/server/infrastructure/repositories/medical-appointments.repository";

export interface MedicalAppointmentListItemInfo {
    id: number,
    appointmentNumber: number,
    createdAt: Date,
    doctorName: string,
}

export async function getAllMedicalAppointmentsByPetId(petId: string): Promise<Response> {
    try {
        const medicalAppointments = await MedicalAppointmentsRepository.getAllMedicalAppointmentsByPetId(petId);
        const medicalAppointmentsInfo = medicalAppointments.map((ma: MedicalAppointmentResource) => (
            {
                id: ma.id,
                createdAt: ma.createdAt,
                appointmentNumber: ma.appointmentNumber,
                doctorName: "Doctor ejemplo",
            }
        ));
        return new Response(JSON.stringify(medicalAppointmentsInfo), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching all medical appointments:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
}