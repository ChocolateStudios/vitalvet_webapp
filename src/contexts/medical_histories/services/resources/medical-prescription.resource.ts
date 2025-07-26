import { AuditableModel } from "../../../_shared/server/models/auditable.model";

export class MedicalPrescriptionResource extends AuditableModel {
    public name: string = "";
    public details: string = "";
    public medicalAppointmentId: number = 0;
}