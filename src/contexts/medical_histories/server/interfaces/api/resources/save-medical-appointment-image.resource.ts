import type { ImagePerMedicalAppointment } from "@/contexts/medical_histories/server/models/image-per-medical-appointment.model";

export class SaveMedicalAppointmentImageResource {
    public imageName: string = "";
    public imageUrl: string = "";

    constructor(imageName: string, imageUrl: string) {
        this.imageName = imageName;
        this.imageUrl = imageUrl;
    }
    
    public toModel(): ImagePerMedicalAppointment {
        return {
            ...this,
            id: 0,
            medicalAppointmentId: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}