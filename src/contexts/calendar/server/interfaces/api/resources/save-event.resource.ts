import { Event } from "../../../models/event.model";

export class SaveEventResource {
    public title: string = "";
    public startDateTime: Date = new Date();
    public endDateTime: Date = new Date();
    public description: string = "";
    public doctorProfileId: number = 0;
    public petId: number = 0;

    public toModel(): Event {
        return {
            ...this,
            id: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            stringId: "",
        }
    }
}