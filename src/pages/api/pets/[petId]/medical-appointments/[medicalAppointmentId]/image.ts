import type { APIRoute } from 'astro';
import { SaveFileResource } from '@/contexts/files/server/interfaces/api/resources/save-file.resource';
import { uploadFile } from '@/contexts/files/server/application/usecases/upload-file.usecase';
import { MEDICAL_APPOINTMENT_STORAGE_ROUTE } from '@/contexts/files/server/infrastructure/repositories/file.repository';
import { parseMultipartFormData } from '@/contexts/_shared/server/utils/form-data.util';

export const prerender = false;

/********************************************
 ***** Upload medical appointment image *****
********************************************/
export const POST: APIRoute = async ({ request, params }) => {
    /**************************
    ***** Api paramenters *****
    **************************/
    const { petId, medicalAppointmentId } = params;
    
    /* *** Validations *** */
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    if (!medicalAppointmentId) {
        return new Response(JSON.stringify({ message: 'Medical Appointment ID is required' }), { status: 400 });
    }
    
    try {
        /*************************
        ***** Read form data *****
        *************************/
        const { fields, fileContent, fileMimeType } = await parseMultipartFormData(request);

        /* *** Validations *** */
        if (!fileContent) {
            return new Response(JSON.stringify({ message: "File not found in form data" }), { status: 400 });
        }

        /****************************
        ***** Assemble resource *****
        ****************************/
        const fileName = fields.filename as string;
        const extension = fields.extension as string;
        const contentType = fileMimeType;
        const size = fields.size as string;
        const storagePath = `${MEDICAL_APPOINTMENT_STORAGE_ROUTE(petId)}/${medicalAppointmentId}/images`;
        
        const resource = new SaveFileResource(fileContent, fileName, extension, contentType, Number(size), storagePath);

        /* *** Call service *** */
        const result = await uploadFile(resource);

        /**************************
        ***** Return response *****
        **************************/
        if (result.success) {
            return new Response(JSON.stringify(result.data), { 
                status: 201, 
                headers: { 'Content-Type': 'application/json' } 
            });
        } else {
            return new Response(JSON.stringify({ message: result.errorMessage }), { status: 500 });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};