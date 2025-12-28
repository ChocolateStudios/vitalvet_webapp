import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";
import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/server/infrastructure/repositories/medical-appointments.repository";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import type { PetStatus } from "@/contexts/pets/server/models/pet-status.enum";
import type { PetExtendedResource } from "@/contexts/pets/server/interfaces/api/resources/pet.resource";

export async function getPet(petId: string): Promise<UsecaseResult<PetExtendedResource>> {
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