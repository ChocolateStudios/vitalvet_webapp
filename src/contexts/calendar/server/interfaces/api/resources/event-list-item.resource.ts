export class EventListItemResource {
    public id: string | number = '';
    public title: string = '';
    public startDateTime: Date = new Date();
    public endDateTime: Date = new Date();
    public doctorName: string = '';
    public petName: string = '';

    constructor(id: string | number, title: string, startDateTime: Date, endDateTime: Date, doctorName: string, petName: string) {
        this.id = id;
        this.title = title;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.doctorName = doctorName;
        this.petName = petName;
    }
}