import { EventsRepository } from "@/contexts/calendar/server/infrastructure/repositories/event.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { EventResource } from "@/contexts/calendar/server/interfaces/api/resources/event.resource";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";

export interface EventListItemInfo {
    id: string;
    title: string;
    startDateTime: Date;
    endDateTime: Date;
    doctorName: string;
    petName: string;
}

export async function getEventsByDateRange(startDate: Date, endDate: Date): Promise<UsecaseResult<EventListItemInfo[]>> {
    const events = await EventsRepository.getAllByDateRange(startDate, endDate);

    if (events.length === 0) {
        return {
            data: [],
            success: true,
        };
    }

    const uniqueDoctorProfileIds = [...new Set(events.map(event => event.doctorProfileId as string))];
    const uniquePetIds = [...new Set(events.map(event => event.petId as string))];

    const doctors = await ProfilesRepository.getAllProfilesByIds(uniqueDoctorProfileIds);
    const pets = await PetsRepository.getAllPetsByIds(uniquePetIds);
    
    const eventsInfo = events.map((event: EventResource) => {
        const doctor = doctors.find(doc => doc.id === event.doctorProfileId);
        const pet = pets.find(p => p.id === event.petId);

        return {
            id: event.id.toString(),
            title: event.title,
            startDateTime: event.startDateTime,
            endDateTime: event.endDateTime,
            doctorName: doctor ? `${doctor.name} ${doctor.lastname}` : "N/A",
            petName: pet ? pet.name : "N/A",
        };
    });

    return {
        data: eventsInfo,
        success: true,
    };
}
