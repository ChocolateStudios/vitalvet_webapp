import { Event } from "../../models/event.model";
import { EventResource } from "../resources/event.resource";
import type { SaveEventResource } from "../resources/save-event.resource";

const events: Event[] = [
    {
        id: 1,
        title: "Bañar a pluto",
        startDateTime: new Date(2025, 0, 15, 3, 5, 12),
        endDateTime: new Date(2025, 0, 15, 3, 5, 12),
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        doctorProfileId: 1,
        petId: 1,
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
        stringId: "1",
    },
    {
        id: 2,
        title: "Vacunar a Pepe",
        startDateTime: new Date(2025, 0, 15, 3, 5, 12),
        endDateTime: new Date(2025, 0, 15, 3, 5, 12),
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        doctorProfileId: 1,
        petId: 4,
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
        stringId: "2",
    },
    {
        id: 3,
        title: "Bañar a Juanito",
        startDateTime: new Date(2025, 0, 15, 3, 5, 12),
        endDateTime: new Date(2025, 0, 15, 3, 5, 12),
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        doctorProfileId: 1,
        petId: 2,
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
        stringId: "3",
    },
    {
        id: 4,
        title: "Chequear a Toby",
        startDateTime: new Date(2025, 0, 15, 3, 5, 12),
        endDateTime: new Date(2025, 0, 15, 3, 5, 12),
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        doctorProfileId: 1,
        petId: 3,
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
        stringId: "4",
    },
    {
        id: 5,
        title: "Vacunar a María",
        startDateTime: new Date(2025, 0, 15, 3, 5, 12),
        endDateTime: new Date(2025, 0, 15, 3, 5, 12),
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        doctorProfileId: 1,
        petId: 2,
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
        stringId: "5",
    },
    {
        id: 6,
        title: "Quitar pulgas a George",
        startDateTime: new Date(2025, 6, 15, 3, 5, 12),
        endDateTime: new Date(2025, 0, 15, 3, 5, 12),
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        doctorProfileId: 1,
        petId: 2,
        createdAt: new Date(2025, 0, 15, 3, 5, 12),
        updatedAt: new Date(2025, 0, 15, 3, 5, 12),
        stringId: "6",
    },
];


export class EventsApiMock {
    static registerEvent(data: SaveEventResource): EventResource {
        const newEvent: Event = data.toModel();
        newEvent.id = events.length + 1,
        newEvent.createdAt = new Date();
        newEvent.updatedAt = new Date();
        events.push(newEvent);
        return new EventResource(newEvent);
    }

    static updateEvent(eventId: number, data: SaveEventResource): EventResource {
        const existingEvent = events.find(event => event.id === eventId);

        if (!existingEvent) {
            throw Error(`Event not found with id ${eventId}`);
        }

        existingEvent.title = data.title;
        existingEvent.startDateTime = data.startDateTime;
        existingEvent.endDateTime = data.endDateTime;
        existingEvent.description = data.description;
        existingEvent.doctorProfileId = data.doctorProfileId;
        existingEvent.petId = data.petId;
        existingEvent.updatedAt = new Date();

        return new EventResource(existingEvent);
    }

    static deleteEvent(eventId: number): EventResource {
        const existingEvent = events.find(event => event.id === eventId);

        if (!existingEvent) {
            throw Error(`Event not found with id ${eventId}`);
        }

        events.splice(events.indexOf(existingEvent), 1);
        return new EventResource(existingEvent);
    }

    static getEvent(eventId: number): EventResource {
        console.log(events);
        const existingEvent = events.find(event => event.id === Number(eventId));

        if (!existingEvent) {
            throw Error(`Event not found with id ${eventId}`);
        }

        return new EventResource(existingEvent);
    }

    static getAllEvents(): EventResource[] {
        const resources = events.map(event => new EventResource(event));
        return resources;
    }
}