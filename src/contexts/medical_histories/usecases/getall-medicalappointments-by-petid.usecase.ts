import { MedicalAppointmentsApiMock } from "@/contexts/medical_histories/services/mock/medical-appointments.mock";
import type { MedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/medical-appointment.resource";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/services/repositories/medical-appointments.repository";
import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";

interface MedicalAppointmentListItemInfo {
    id: number,
    appointmentNumber: number,
    createdAt: Date,
    doctorName: string,
}

export async function getAllMedicalAppointmentsByPetId(petId: string): Promise<UsecaseResult<MedicalAppointmentListItemInfo[]>> {
    let medicalAppointments: MedicalAppointmentResource[];

    try {
        medicalAppointments = await MedicalAppointmentsRepository.getAllMedicalAppointmentsByPetId(petId);
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        }
    }

    const medicalAppointmentsInfo = medicalAppointments.map((ma, index) => {
        return {
            id: ma.id,
            appointmentNumber: index + 1,
            createdAt: ma.createdAt,
            doctorName: "Doctor ejemplo",
        };
    })

    return {
        data: medicalAppointmentsInfo,
        success: true,
    };
}

export function getAllMedicalAppointmentsByPetIdMocked(petId: number): MedicalAppointmentListItemInfo[] {
    const medicalAppointments = MedicalAppointmentsApiMock.getAllMedicalAppointmentsByPetId(petId);
    const medicalAppointmentsInfo = medicalAppointments.map((ma, index) => {
        return {
            id: ma.id,
            appointmentNumber: index + 1,
            createdAt: ma.createdAt,
            doctorName: "Doctor ejemplo",
        };
    })

    return medicalAppointmentsInfo;
}