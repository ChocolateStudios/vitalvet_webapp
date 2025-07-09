import { AuditableModel } from "../../_shared/models/auditable.model";

export class MedicalAppointment extends AuditableModel {
    public details: string = "";
    public observations: string = "";
    public petId: number = 0;
}