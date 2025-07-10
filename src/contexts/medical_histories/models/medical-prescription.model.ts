import { AuditableModel } from "../../_shared/models/auditable.model";

export class MedicalPrescription extends AuditableModel {
    public name: string = "";
    public details: string = "";
    public medicalAppointmentId: number = 0;
}