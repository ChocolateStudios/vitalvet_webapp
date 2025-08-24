import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { MedicalAppointmentsRepository } from "@/contexts/medical_histories/server/infrastructure/repositories/medical-appointments.repository";

export async function getPet(petId: string): Promise<UsecaseResult<any>> {
    try {
        const pet = await PetsRepository.getPet(petId);
        const lastMedicalAppointment = await MedicalAppointmentsRepository.getLastMedicalAppointmentByPetId(petId);
        
        const petInfo = {
            ...pet,
            birthday: new Date(pet.birthday),
            ownerName: "John Doe",
            weight: lastMedicalAppointment.weight,
        };
        
        return {
            data: petInfo,
            success: true,
        };
    }
    catch (error) {
        return {
            data: null,
            success: false,
        };
    }
}