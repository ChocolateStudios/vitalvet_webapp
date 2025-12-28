import type { SaveEventResource } from "@/contexts/calendar/server/interfaces/api/resources/save-event.resource";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export async function createEvent(event: SaveEventResource): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`/api/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "Could not create event",
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