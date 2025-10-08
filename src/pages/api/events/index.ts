import type { APIRoute } from 'astro';
import { SaveEventResource } from '@/contexts/calendar/server/interfaces/api/resources/save-event.resource';
import { EventsRepository } from '@/contexts/calendar/server/infrastructure/repositories/event.repository';
import { getEventsByDateRange } from '@/contexts/calendar/server/application/usecases/get-events-by-datarange.usecase';
import { getAllEvents } from '@/contexts/calendar/server/application/usecases/getall-events.usecase';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
    const startDateParam = url.searchParams.get('startDate');
    const endDateParam = url.searchParams.get('endDate');

    try {
        if (startDateParam && endDateParam) {
            const startDate = new Date(startDateParam);
            const endDate = new Date(endDateParam);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                return new Response(JSON.stringify({ message: 'Invalid date format' }), { status: 400 });
            }

            const result = await getEventsByDateRange(startDate, endDate);
            if (result.success) {
                return new Response(JSON.stringify(result.data), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                return new Response(JSON.stringify({ message: 'An unexpected error occurred' }), { status: 500 });
            }
        } else {
            const result = await getAllEvents();
            if (result.success) {
                return new Response(JSON.stringify(result.data), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                return new Response(JSON.stringify({ message: 'An unexpected error occurred' }), { status: 500 });
            }
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const resource = new SaveEventResource(body.title, new Date(body.startDateTime), new Date(body.endDateTime), body.description, body.doctorProfileId, body.petId, body.eventTypeId);

        const newEvent = await EventsRepository.create(resource);
        return new Response(JSON.stringify(newEvent), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};