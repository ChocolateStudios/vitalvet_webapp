import type { MedicalAppointment } from "@/contexts/medical_histories/server/models/medical-appointment.model";

export class SaveMedicalAppointmentResource {
    public details: string = "";
    public observations: string = "";
    public prescription: string = "";
    public appointmentDate: Date = new Date();
    public doctorProfileId: number | string = 0;

    constructor(details: string, observations: string, prescription: string, appointmentDate: Date, doctorProfileId: number | string) {
        this.details = details;
        this.observations = observations;
        this.prescription = prescription;
        this.appointmentDate = appointmentDate;
        this.doctorProfileId = doctorProfileId;
    }
    
    public toModel(): MedicalAppointment {
        return {
            ...this,
            id: 0,
            petId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}