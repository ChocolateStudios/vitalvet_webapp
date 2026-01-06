import type { APIRoute } from "astro";
import { saveFileToMedicalAppointment } from "@/contexts/files/server/application/usecases/save-file-to-medical-appointment.usecase";
import { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";
import { deleteFile } from "@/contexts/files/server/application/usecases/delete-file.usecase";
import { parseMultipartFormData } from "@/contexts/_shared/server/utils/form-data.util";

export const prerender = false;

export const POST: APIRoute = async ({ request, params }) => {
    try {
        const { petId, medicalAppointmentId, documentId } = params;

        if (!petId || !medicalAppointmentId) {
            return new Response(
                JSON.stringify({ message: "Pet ID and Medical Appointment ID are required" }),
                { status: 400 }
            );
        }

        /*************************
        ***** Read form data *****
        *************************/
        const formData = await parseMultipartFormData(request);
        
        /* *** Validations *** */
        if (!formData.fileContent) {
            return new Response(JSON.stringify({ message: "File not found in form data" }), { status: 400 });
        }
        
        /****************************
        ***** Assemble resource *****
        ****************************/
        const storagePath = `pets/${petId}/medical-appointments/${medicalAppointmentId}/documents`;
        const resource = SaveFileResource.fromMultipartFormData({ formData, customStoragePath: storagePath });

        /* *** Call service *** */
        const result = await saveFileToMedicalAppointment(resource, petId, medicalAppointmentId);

        /**************************
        ***** Return response *****
        **************************/
        if (result.success) {
            return new Response(JSON.stringify(result.data), {
                status: 201,
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

export const DELETE: APIRoute = async ({ params }) => {
    try {
        const { documentId } = params;

        if (!documentId) {
            return new Response(
                JSON.stringify({ message: "Document ID is required" }),
                { status: 400 }
            );
        }

        const result = await deleteFile(documentId);

        if (result.success) {
            return new Response(null, { status: 204 });
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
