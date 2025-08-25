import type { MedicalAppointment } from "@/contexts/medical_histories/server/models/medical-appointment.model";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/server/infrastructure/repositories/medical-appointments.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export interface MedicalAppointmentInfo extends MedicalAppointment {
    appointmentNumber: number,
}

export async function getMedicalAppointment(petId: string, medicalAppointmentId: string): Promise<UsecaseResult<MedicalAppointmentInfo>> {
    try {
        const medicalAppointment = await MedicalAppointmentsRepository.getMedicalAppointment(petId, medicalAppointmentId);
        const petInfo: MedicalAppointmentInfo = {
            ...medicalAppointment,
        };

        return {
            data: petInfo,
            success: true,
        }
        // return new Response(JSON.stringify(petInfo), {
        //     status: 200,
        //     headers: { 'Content-Type': 'application/json' }
        // });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching medical appointment:", errorMessage); // Loguear el error real para depuración
        // return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });

        return {
            data: undefined,
            success: false,
        };
    }
}