import { Event } from "@/contexts/calendar/server/models/event.model";

export class SaveEventResource {
    public title: string = "";
    public startDateTime: Date = new Date();
    public endDateTime: Date = new Date();
    public description: string = "";
    public doctorProfileId: number | string = 0;
    public petId: number | string = 0;
    public eventTypeId: number | string = 0;

    constructor(title: string, startDateTime: Date, endDateTime: Date, description: string, doctorProfileId: number | string, petId: number | string, eventTypeId: number | string) {
        this.title = title;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.description = description;
        this.doctorProfileId = doctorProfileId;
        this.petId = petId;
        this.eventTypeId = eventTypeId;
    }

    public toModel(): Event {
        return {
            ...this,
            id: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            isActive: true,
        }
    }

    public static fromJsonBody(body: any): SaveEventResource {
        return new SaveEventResource(
            body.title,
            new Date(body.startDateTime),
            new Date(body.endDateTime),
            body.description,
            body.doctorProfileId,
            body.petId,
            body.eventTypeId,
        );
    }
}