import { AuditableModel } from "../../_shared/server/models/auditable.model";

export class MedicalAppointment extends AuditableModel {
    public details: string = "";
    public observations: string = "";
    public prescription: string = "";
    public petId: number = 0;
    public stringPetId: string = "";
    public doctorProfileId: number = 0;
}