import { AuditableModel } from "../../../_shared/models/auditable.model";
import type { MedicalAppointment } from "../../models/medical-appointment.model";

export class MedicalAppointmentResource extends AuditableModel {
    public details: string = "";
    public observations: string = "";
    public prescription: string = "";
    public petId: number = 0;
    public appointmentNumber: number = 0;
    public doctorProfileId: number = 0;

    constructor(model: MedicalAppointment) {
        super();
        this.id = model.id;
        this.stringId = model.stringId,
        this.details = model.details;
        this.observations = model.observations;
        this.prescription = model.prescription;
        this.petId = model.petId;
        this.doctorProfileId = model.doctorProfileId;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }

    static fromModel(model: MedicalAppointment) {
        return new MedicalAppointmentResource(model);
    }
}