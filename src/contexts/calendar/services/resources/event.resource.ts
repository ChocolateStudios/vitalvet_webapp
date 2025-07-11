import { AuditableModel } from "../../../_shared/models/auditable.model";
import { Event } from "../../models/event.model";

export class EventResource extends AuditableModel {
    public title: string = "";
    public startDateTime: Date = new Date();
    public endDateTime: Date = new Date();
    public description: string = "";
    public doctorProfileId: number = 0;
    public petId: number = 0;

    constructor(model: Event) {
        super();
        this.id = model.id;
        this.title = model.title;
        this.startDateTime = model.startDateTime;
        this.endDateTime = model.endDateTime;
        this.description = model.description;
        this.doctorProfileId = model.doctorProfileId;
        this.petId = model.petId;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}