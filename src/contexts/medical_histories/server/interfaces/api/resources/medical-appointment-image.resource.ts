import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import type { ImagePerMedicalAppointment } from "@/contexts/medical_histories/server/models/image-per-medical-appointment.model";

export class MedicalAppointmentImageResource extends AuditableModel {
    public imageName: string = "";
    public imageUrl: string = "";
    public medicalAppointmentId: number | string = 0;

    constructor(model: ImagePerMedicalAppointment) {
        super();
        this.id = model.id;
        this.imageName = model.imageName;
        this.imageUrl = model.imageUrl;
        this.medicalAppointmentId = model.medicalAppointmentId;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }

    static fromModel(model: ImagePerMedicalAppointment) {
        return new MedicalAppointmentImageResource(model);
    }
}