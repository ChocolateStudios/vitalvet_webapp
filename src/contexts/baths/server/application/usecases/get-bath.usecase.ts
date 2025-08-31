import type { Bath } from "@/contexts/baths/server/models/bath.model";
import { BathsRepository } from "@/contexts/baths/server/infrastructure/repositories/baths.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export interface BathInfo extends Bath {
    bathNumber: number,
}

export async function getBath(petId: string, bathId: string): Promise<UsecaseResult<BathInfo>> {
    try {
        const bath = await BathsRepository.getBath(petId, bathId);
        const bathInfo: BathInfo = {
            ...bath,
        };

        return {
            data: bathInfo,
            success: true,
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching medical bath:", errorMessage); // Loguear el error real para depuración

        return {
            data: undefined,
            success: false,
        };
    }
}