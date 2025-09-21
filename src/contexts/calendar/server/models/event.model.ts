import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";

export class Event extends AuditableModel {
    public title: string = "";
    public startDateTime: Date = new Date();
    public endDateTime: Date = new Date();
    public description: string = "";
    public doctorProfileId: number | string = 0;
    public petId: number | string = 0;
    public eventTypeId: number | string = 0;
}