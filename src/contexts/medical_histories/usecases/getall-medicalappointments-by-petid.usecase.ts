import { MedicalAppointmentsApiMock } from "../services/mock/medical-appointments.mock";

interface MedicalAppointmentListItemInfo {
    id: number,
    appointmentNumber: number,
    createdAt: Date,
    doctorName: string,
}

export function getAllMedicalAppointmentsByPetId(petId: number): MedicalAppointmentListItemInfo[] {
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