import type { APIRoute } from "astro";
import { getFilesByMedicalAppointment } from "@/contexts/files/server/application/usecases/get-files-by-medical-appointment.usecase";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    try {
        const { petId, medicalAppointmentId } = params;

        if (!petId || !medicalAppointmentId) {
            return new Response(
                JSON.stringify({ message: "Pet ID and Medical Appointment ID are required" }),
                { status: 400 }
            );
        }

        const result = await getFilesByMedicalAppointment(petId, medicalAppointmentId);

        if (result.success) {
            return new Response(JSON.stringify(result.data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(
                JSON.stringify({ message: result.errorMessage }),
                { status: 500 }
            );
        }
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "An unexpected error occurred";
        return new Response(JSON.stringify({ message: errorMessage }), {
            status: 500,
        });
    }
};
