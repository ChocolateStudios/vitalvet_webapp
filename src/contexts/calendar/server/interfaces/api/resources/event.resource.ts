import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import { Event } from "@/contexts/calendar/server/models/event.model";

export class EventResource extends AuditableModel {
    public title: string = "";
    public startDateTime: Date = new Date();
    public endDateTime: Date = new Date();
    public description: string = "";
    public doctorProfileId: number | string = 0;
    public petId: number | string = 0;
    public eventTypeId: number | string = 0;

    constructor(model: Event) {
        super();
        this.id = model.id;
        this.title = model.title;
        this.startDateTime = model.startDateTime;
        this.endDateTime = model.endDateTime;
        this.description = model.description;
        this.doctorProfileId = model.doctorProfileId;
        this.petId = model.petId;
        this.eventTypeId = model.eventTypeId;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}