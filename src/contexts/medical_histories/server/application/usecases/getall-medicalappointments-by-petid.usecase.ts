import type { MedicalAppointmentResource } from "@/contexts/medical_histories/server/interfaces/api/resources/medical-appointment.resource";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/server/infrastructure/repositories/medical-appointments.repository";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";

export interface MedicalAppointmentListItemInfo {
    id: number | string,
    appointmentNumber: number,
    appointmentDate: Date,
    doctorName: string,
}

export async function getAllMedicalAppointmentsByPetId(petId: string): Promise<Response> {
    try {
        const medicalAppointments = await MedicalAppointmentsRepository.getAllMedicalAppointmentsByPetId(petId);

        // 1. Crear una lista de IDs únicos de los doctores para evitar consultas duplicadas.
        const uniqueDoctorProfileIds = [...new Set(medicalAppointments.map(ma => ma.doctorProfileId as string))];

        // 2. Obtener los perfiles de los doctores.
        const doctorProfiles = await ProfilesRepository.getAllProfilesByProfileIds(uniqueDoctorProfileIds);

        // 3. Mapear las citas médicas, incluyendo el nombre del doctor
        const medicalAppointmentsInfo = medicalAppointments.map((ma: MedicalAppointmentResource) => {
            const doctor = doctorProfiles.find(dp => dp.id === ma.doctorProfileId);
            
            return {
                id: ma.id,
                appointmentDate: ma.appointmentDate,
                appointmentNumber: ma.appointmentNumber,
                doctorName: doctor != null ? doctor?.name + ' ' + doctor?.lastname : 'No se encontró el doctor',
            };
        });
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