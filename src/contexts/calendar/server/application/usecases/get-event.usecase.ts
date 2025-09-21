import { EventsRepository } from "@/contexts/calendar/server/infrastructure/repositories/event.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";

export interface EventInfo {
    id: string;
    title: string;
    startDateTime: Date;
    endDateTime: Date;
    description: string;
    petId: string | number;
    petName: string;
    doctorProfileId: string | number;
    doctorName: string;
}

export async function getEvent(eventId: string): Promise<UsecaseResult<EventInfo>> {
    try {
        const event = await EventsRepository.get(eventId);
        const pet = await PetsRepository.getPet(event.petId as string);
        const doctor = await ProfilesRepository.getProfileById(event.doctorProfileId as string);
        
        const eventInfo: EventInfo = {
            id: event.id as string,
            title: event.title,
            startDateTime: event.startDateTime,
            endDateTime: event.endDateTime,
            description: event.description,
            petId: event.petId,
            petName: pet.name,
            doctorProfileId: event.doctorProfileId,
            doctorName: `${doctor.name} ${doctor.lastname}`,
        };

        return {
            data: eventInfo,
            success: true,
        };
    }
    catch (error) {
        console.error(error);
        
        return {
            data: undefined,
            success: false,
        };
    }
}