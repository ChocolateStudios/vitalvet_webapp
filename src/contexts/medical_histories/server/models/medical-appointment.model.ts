import { AuditableModel } from "../../../_shared/server/models/auditable.model";

export class MedicalAppointment extends AuditableModel {
    public weight: number = 0;
    public details: string = "";
    public observations: string = "";
    public prescription: string = "";
    public appointmentDate: Date = new Date();
    public petId: number | string = 0;
    public doctorProfileId: number | string = 0;
}