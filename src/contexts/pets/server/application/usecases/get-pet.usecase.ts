import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/server/infrastructure/repositories/medical-appointments.repository";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import type { PetInfo } from "@/contexts/pets/client/usecases/_interfaces";
import type { PetStatus } from "../../models/pet-status.enum";

export async function getPet(petId: string): Promise<UsecaseResult<PetInfo>> {
    try {
        const pet = await PetsRepository.getPet(petId);
        const lastMedicalAppointment = await MedicalAppointmentsRepository.getLastMedicalAppointmentByPetId(petId);
        const ownerProfile = await ProfilesRepository.getProfileById(pet.ownerProfileId);
        
        const petInfo = {
            ...pet,
            birthday: new Date(pet.birthday),
            ownerProfileId: ownerProfile?.id,
            ownerName: ownerProfile?.name + ' ' + ownerProfile?.lastname,
            weight: lastMedicalAppointment?.weight,
            status: pet.status as PetStatus,
        };

        return {
            data: petInfo,
            success: true,
        };
    }
    catch (error) {
        return {
            data: undefined,
            success: false,
        };
    }
}