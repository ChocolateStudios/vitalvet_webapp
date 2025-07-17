import type { MedicalAppointment } from "../../models/medical-appointment.model";

export class SaveMedicalAppointmentResource {
    public details: string = "";
    public observations: string = "";
    public doctorProfileId: number = 0;

    constructor(details: string, observations: string, doctorProfileId: number) {
        this.details = details;
        this.observations = observations;
        this.doctorProfileId = doctorProfileId;
    }
    
    public toModel(): MedicalAppointment {
        return {
            ...this,
            id: 0,
            stringId: "",
            petId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}