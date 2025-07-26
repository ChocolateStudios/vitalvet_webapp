import type { APIRoute } from 'astro';
import { MedicalAppointmentsApi } from '@/contexts/medical_histories/services/api/medical-appointments.api';
import { SaveMedicalAppointmentResource } from '@/contexts/medical_histories/services/resources/save-medical-appointment.resource';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        const appointments = await MedicalAppointmentsApi.getAllMedicalAppointmentsByPetId(petId);
        return new Response(JSON.stringify(appointments), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request, params }) => {
    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        const body = await request.json();
        const resource = new SaveMedicalAppointmentResource(
            body.details,
            body.observations,
            body.prescription,
            body.doctorProfileId,
        );
        const newAppointment = await MedicalAppointmentsApi.createMedicalAppointment(petId, resource);
        return new Response(JSON.stringify(newAppointment), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
