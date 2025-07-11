import { AuditableModel } from "../../_shared/models/auditable.model";

export class Event extends AuditableModel {
    public title: string = "";
    public startDateTime: Date = new Date();
    public endDateTime: Date = new Date();
    public description: string = "";
    public doctorProfileId: number = 0;
    public petId: number = 0;
}