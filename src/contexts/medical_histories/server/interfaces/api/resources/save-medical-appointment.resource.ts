import type { MedicalAppointment } from "@/contexts/medical_histories/server/models/medical-appointment.model";

export class SaveMedicalAppointmentResource {
    public weight: number = 0;
    // public details: string = "";
    public observations: string = "";
    public prescription: string = "";
    public appointmentDate: Date = new Date();
    public doctorProfileId: number | string = 0;

    constructor(weight: number, /*details: string, */observations: string, prescription: string, appointmentDate: Date, doctorProfileId: number | string) {
        this.weight = weight;
        // this.details = details;
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
            isActive: true,
        }
    }

    public static fromJsonBody(body: any): SaveMedicalAppointmentResource {
        return new SaveMedicalAppointmentResource(
            body.weight,
            body.observations,
            body.prescription,
            new Date(body.appointmentDate),
            body.doctorProfileId,
        );
    }
}