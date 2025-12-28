import type { APIRoute } from 'astro';
import { SaveFileResource } from '@/contexts/files/server/interfaces/api/resources/save-file.resource';
import { uploadFile } from '@/contexts/files/server/application/usecases/upload-file.usecase';
import { getStreamFile } from '@/contexts/files/server/application/usecases/get-stream-file.usecase';
import { PET_STORAGE_ROUTE } from '@/contexts/files/server/infrastructure/repositories/file.repository';
import { parseMultipartFormData } from '@/contexts/_shared/server/utils/form-data.util';

export const prerender = false;

/*******************************
***** Upload profile image *****
*******************************/
export const POST: APIRoute = async ({ request, params }) => {
    /**************************
    ***** Api paramenters *****
    **************************/
    const { petId } = params;
    
    /* *** Validations *** */
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    
    try {
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
        const fileName = 'profilePhoto';
        const storagePath = `${PET_STORAGE_ROUTE}/${petId}`;
        const resource = SaveFileResource.fromMultipartFormData({ formData, customName: fileName, customStoragePath: storagePath });

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


/****************************
***** Get profile image *****
****************************/
export const GET: APIRoute = async ({ params }) => {
    /**************************
    ***** Api paramenters *****
    **************************/
    const { petId } = params;
    
    /* *** Validations *** */
    if (!petId) {
        return new Response('Pet ID is required', { status: 400 });
    }

    try {
        /* *** Call service *** */
        const result = await getStreamFile(`${PET_STORAGE_ROUTE}/${petId}/profilePhoto`, 'src/assets/petProfilePhoto.png');

        /**************************
        ***** Return response *****
        **************************/
        if (result.success) {
            return new Response(result.data.stream, {
                status: 200,
                headers: {
                    'Content-Type': result.data.metadata.contentType || 'application/octet-stream',
                    'Cache-Control': 'public, max-age=31536000, immutable'
                }
            });
        } else {
            return new Response(JSON.stringify({ message: result.errorMessage }), { status: 500 });
        }

    } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
            return new Response('Image not found', { status: 404 });
        }
        const errorMessage = error.message || 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: 'Error downloading image', error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};