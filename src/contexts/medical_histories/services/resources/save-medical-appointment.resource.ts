import type { MedicalAppointment } from "../../models/medical-appointment.model";

export class SaveMedicalAppointmentResource {
    public details: string = "";
    public observations: string = "";
    public doctorProfileId: number = 0;
    
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