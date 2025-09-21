import type { SaveEventResource } from "@/contexts/calendar/server/interfaces/api/resources/save-event.resource";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export async function updateEvent(eventId: string, event: SaveEventResource, baseUrl: string = ''): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`${baseUrl}/api/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "Could not update event",
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