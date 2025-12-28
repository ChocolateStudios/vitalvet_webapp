import type { BathResource } from "@/contexts/baths/server/interfaces/api/resources/bath.resource";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";
import { BathsRepository } from "@/contexts/baths/server/infrastructure/repositories/baths.repository";

export interface BathListItemInfo {
    id: number | string,
    bathNumber: number,
    bathDate: Date,
    doctorName: string,
}

export async function getAllBathsByPetId(petId: string): Promise<UsecaseResult<BathListItemInfo[]>> {
    try {
        const baths = await BathsRepository.getAllBathsByPetId(petId);

        // 1. Crear una lista de IDs únicos de los doctores para evitar consultas duplicadas.
        const uniqueDoctorProfileIds = [...new Set(baths.map(bath => bath.doctorProfileId as string))];

        // 2. Obtener los perfiles de los doctores.
        const doctorProfiles = await ProfilesRepository.getAllProfilesByProfileIds(uniqueDoctorProfileIds);

        // 3. Mapear los baños, incluyendo el nombre del doctor
        const bathsInfo = baths.map((bath: BathResource) => {
            const doctor = doctorProfiles.find(dp => dp.id === bath.doctorProfileId);
            
            return {
                id: bath.id,
                bathDate: bath.bathDate,
                bathNumber: bath.bathNumber,
                doctorName: doctor != null ? doctor?.name + ' ' + doctor?.lastname : 'No se encontró el doctor',
            };
        });

        return {
            data: bathsInfo,
            success: true,
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching all medical baths:", errorMessage); // Loguear el error real para depuración

        return {
            data: undefined,
            success: false,
        };
    }
}