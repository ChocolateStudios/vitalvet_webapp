import { MedicalAppointmentsApi } from "@/contexts/medical_histories/services/api/medical-appointments.api";
import { SaveMedicalAppointmentResource } from "@/contexts/medical_histories/services/resources/save-medical-appointment.resource";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const { petId, medicalAppointmentId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    if (!medicalAppointmentId) {
        return new Response(JSON.stringify({ message: 'Medical Appointment ID is required' }), { status: 400 });
    }

    try {
        const appointments = await MedicalAppointmentsApi.getMedicalAppointmentById(petId, medicalAppointmentId);
        return new Response(JSON.stringify(appointments), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const PUT: APIRoute = async ({ request, params }) => {
    const { petId, medicalAppointmentId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    if (!medicalAppointmentId) {
        return new Response(JSON.stringify({ message: 'Medical Appointment ID is required' }), { status: 400 });
    }

    try {
        const body = await request.json();
        const resource = new SaveMedicalAppointmentResource(
            body.details,
            body.observations,
            body.prescription,
            body.doctorProfileId,
        );
        const updatedPet = await MedicalAppointmentsApi.updateMedicalAppointment(petId, medicalAppointmentId, resource);
        return new Response(JSON.stringify(updatedPet), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ params }) => {
    const { petId, medicalAppointmentId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    if (!medicalAppointmentId) {
        return new Response(JSON.stringify({ message: 'Medical Appointment ID is required' }), { status: 400 });
    }

    try {
        await MedicalAppointmentsApi.deleteMedicalAppointment(petId, medicalAppointmentId);
        return new Response(null, { status: 204 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
