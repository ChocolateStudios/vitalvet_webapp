import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export async function deleteEvent(eventId: string): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`/api/events/${eventId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "Could not delete event",
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