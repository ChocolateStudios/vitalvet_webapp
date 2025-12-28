import { EventsRepository } from "@/contexts/calendar/server/infrastructure/repositories/event.repository";
import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";
import { EventResource } from "@/contexts/calendar/server/interfaces/api/resources/event.resource";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";
import { EventListItemResource } from "@/contexts/calendar/server/interfaces/api/resources/event-list-item.resource";

export async function getEventsByDateRange(startDate: Date, endDate: Date): Promise<UsecaseResult<EventListItemResource[]>> {
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

        return new EventListItemResource(
            event.id.toString(),
            event.title,
            event.startDateTime,
            event.endDateTime,
            doctor ? `${doctor.name} ${doctor.lastname}` : "N/A",
            pet ? pet.name : "N/A",
        );
    });

    return {
        data: eventsInfo,
        success: true,
    };
}
