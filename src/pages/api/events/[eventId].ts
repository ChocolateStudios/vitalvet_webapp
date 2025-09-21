import type { APIRoute } from 'astro';
import { SaveEventResource } from '@/contexts/calendar/server/interfaces/api/resources/save-event.resource';
import { EventsRepository } from '@/contexts/calendar/server/infrastructure/repositories/event.repository';

export const prerender = false;

export const PUT: APIRoute = async ({ request, params }) => {
    const { eventId } = params;
    if (!eventId) {
        return new Response(JSON.stringify({ message: 'Event ID is required' }), { status: 400 });
    }

    try {
        const body = await request.json();
        const resource = new SaveEventResource();
        resource.title = body.title;
        resource.description = body.description;
        resource.startDateTime = new Date(body.startDateTime);
        resource.endDateTime = new Date(body.endDateTime);
        resource.petId = body.petId;
        resource.doctorProfileId = body.doctorProfileId;
        resource.eventTypeId = body.eventTypeId;

        const updatedEvent = await EventsRepository.update(eventId, resource);
        return new Response(JSON.stringify(updatedEvent), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ params }) => {
    const { eventId } = params;
    if (!eventId) {
        return new Response(JSON.stringify({ message: 'Event ID is required' }), { status: 400 });
    }

    try {
        await EventsRepository.delete(eventId);
        return new Response(null, { status: 204 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};