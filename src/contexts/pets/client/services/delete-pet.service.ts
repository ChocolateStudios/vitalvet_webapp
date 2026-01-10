import type { ServiceResult } from "@/contexts/_shared/client/services/service-result";
import { getTexts } from "@/i18n";
const { pets: petsTexts, } = getTexts();

export async function deletePet(petId: string): Promise<ServiceResult> {
    try {
        const response = await fetch(`/api/pets/${petId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || petsTexts.feedback.deleteError,
            };
        }

        return {
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}