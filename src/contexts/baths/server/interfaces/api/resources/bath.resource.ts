import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import type { Bath } from "@/contexts/baths/server/models/bath.model";

export class BathResource extends AuditableModel {
    public bathDate: Date = new Date();
    public observations: string = "";
    public petId: number | string = 0;
    public bathNumber: number = 0;
    public doctorProfileId: number | string = 0;

    constructor(model: Bath) {
        super();
        this.id = model.id;
        this.bathDate = model.bathDate;
        this.observations = model.observations;
        this.petId = model.petId;
        this.doctorProfileId = model.doctorProfileId;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }

    static fromModel(model: Bath) {
        return new BathResource(model);
    }
}