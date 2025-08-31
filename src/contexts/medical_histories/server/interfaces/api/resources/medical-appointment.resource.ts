import { AuditableModel } from "../../../../../_shared/server/models/auditable.model";
import type { MedicalAppointment } from "../../../models/medical-appointment.model";

export class MedicalAppointmentResource extends AuditableModel {
    public weight: number = 0;
    // public details: string = "";
    public observations: string = "";
    public prescription: string = "";
    public appointmentDate: Date = new Date();
    public petId: number | string = 0;
    public appointmentNumber: number = 0;
    public doctorProfileId: number | string = 0;

    constructor(model: MedicalAppointment) {
        super();
        this.id = model.id;
        this.weight = model.weight;
        // this.details = model.details;
        this.observations = model.observations;
        this.prescription = model.prescription;
        this.appointmentDate = model.appointmentDate;
        this.petId = model.petId;
        this.doctorProfileId = model.doctorProfileId;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }

    static fromModel(model: MedicalAppointment) {
        return new MedicalAppointmentResource(model);
    }
}