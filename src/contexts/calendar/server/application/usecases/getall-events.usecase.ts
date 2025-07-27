// import { EventsApiMock } from "@/contexts/calendar/server/infrastructure/repositories/events.repository";

export interface EventListItemInfo {
    id: number,
    title: string,
    startDateTime: Date,
    endDateTime: Date,
    doctorProfileId: number,
    petId: number,
}

export function getAllEvents(): EventListItemInfo[] {
    return []
    // const events = EventsApiMock.getAllEvents();
    // const eventsInfo = events.map(event => {
    //     return {
    //         id: event.id,
    //         title: event.title,
    //         startDateTime: event.startDateTime,
    //         endDateTime: event.endDateTime,
    //         doctorProfileId: event.doctorProfileId,
    //         petId: event.petId,
    //     };
    // });
    // return eventsInfo;
}