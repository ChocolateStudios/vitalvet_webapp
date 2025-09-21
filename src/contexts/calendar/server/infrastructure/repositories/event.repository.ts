import { get, push, ref, remove, set, update, query, orderByChild, startAt, endAt } from "firebase/database";
import type { Event } from "@/contexts/calendar/server/models/event.model";
import { EventResource } from "@/contexts/calendar/server/interfaces/api/resources/event.resource";
import type { SaveEventResource } from "@/contexts/calendar/server/interfaces/api/resources/save-event.resource";
import { db } from "@/firebase/client";

export const EVENTS_PATH = 'events';

export class EventsRepository {

    static async create(data: SaveEventResource): Promise<EventResource> {
        const newEvent: Event = data.toModel();
        
        const eventsCollectionRef = ref(db, EVENTS_PATH);
        const newEventRef = push(eventsCollectionRef);

        const eventId = newEventRef.key;
        if (!eventId) {
            throw new Error('Could not generate an ID for the new event.');
        }

        newEvent.id = eventId;

        const dataToSave = {
            ...data,
            startDateTime: newEvent.startDateTime.toISOString(),
            endDateTime: newEvent.endDateTime.toISOString(),
            createdAt: newEvent.createdAt.toISOString(),
            updatedAt: newEvent.updatedAt.toISOString(),
        };

        await set(newEventRef, dataToSave);
        
        return new EventResource(newEvent);
    }

    static async update(eventId: string, data: SaveEventResource): Promise<EventResource> {
        const eventRef = ref(db, `${EVENTS_PATH}/${eventId}`);
        const snapshot = await get(eventRef);
        if (!snapshot.exists()) {
            throw new Error(`Event not found with id ${eventId}`);
        }

        const dataToUpdate = {
            ...data,
            updatedAt: new Date().toISOString(),
        };
        
        await update(eventRef, dataToUpdate);

        return this.get(eventId);
    }

    static async delete(eventId: string): Promise<EventResource> {
        const eventToDelete = await this.get(eventId);
        const eventRef = ref(db, `${EVENTS_PATH}/${eventId}`);

        const snapshot = await get(eventRef);
        if (!snapshot.exists()) {
            throw new Error(`Event not found with id ${eventId}`);
        }

        await remove(eventRef);

        return eventToDelete;
    }

    static async get(eventId: string): Promise<EventResource> {
        const eventRef = ref(db, `${EVENTS_PATH}/${eventId}`);
        const snapshot = await get(eventRef);

        if (!snapshot.exists()) {
            throw new Error(`Event not found with id ${eventId}`);
        }

        const eventData = snapshot.val();
        const eventModel: Event = {
            ...eventData,
            id: eventId,
            startDateTime: new Date(eventData.startDateTime),
            endDateTime: new Date(eventData.endDateTime),
            createdAt: new Date(eventData.createdAt),
            updatedAt: new Date(eventData.updatedAt),
        };

        return new EventResource(eventModel);
    }

    static async getAll(): Promise<EventResource[]> {
        const eventsRef = ref(db, EVENTS_PATH);
        const snapshot = await get(eventsRef);
        if (!snapshot.exists()) return [];

        const eventsData = snapshot.val();
        return Object.keys(eventsData).map(key => {
            const eventData = eventsData[key];
            const eventModel: Event = {
                ...eventData,
                id: key,
                startDateTime: new Date(eventData.startDateTime),
                endDateTime: new Date(eventData.endDateTime),
                createdAt: new Date(eventData.createdAt),
                updatedAt: new Date(eventData.updatedAt),
            };
            return new EventResource(eventModel);
        });
    }

    static async getAllByDateRange(startDate: Date, endDate: Date): Promise<EventResource[]> {
        const eventsRef = ref(db, EVENTS_PATH);
        const eventsQuery = query(eventsRef, orderByChild('startDateTime'), startAt(startDate.toISOString()), endAt(endDate.toISOString()));
        
        const snapshot = await get(eventsQuery);
        if (!snapshot.exists()) {
            return [];
        }

        const eventsData = snapshot.val();
        return Object.keys(eventsData).map(key => {
            const eventData = eventsData[key];
            const eventModel: Event = {
                ...eventData,
                id: key,
                startDateTime: new Date(eventData.startDateTime),
                endDateTime: new Date(eventData.endDateTime),
                createdAt: new Date(eventData.createdAt),
                updatedAt: new Date(eventData.updatedAt),
            };
            return new EventResource(eventModel);
        });
    }
}