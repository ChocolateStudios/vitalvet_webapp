import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";

export class ImagePerMedicalAppointment extends AuditableModel {
    public imageName: string = "";
    public imageUrl: string = "";
    public medicalAppointmentId: number | string = 0;
}