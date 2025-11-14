import fs from 'fs';
import path from 'path';
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { getStreamFile } from "@/contexts/files/server/application/usecases/get-stream-file.usecase";
import { uploadFile } from "@/contexts/files/server/application/usecases/upload-file.usecase";
import type { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";

const PET_STORAGE_ROUTE = 'pets';

export async function uploadPetProfileImage(petId: string, file: SaveFileResource): Promise<UsecaseResult<any>> {
    const storagePath = `${PET_STORAGE_ROUTE}/${petId}`;
    file.fileName = 'profilePhoto';
    file.storagePath = storagePath;

    return uploadFile(file);
}

export async function getPetProfileImage(petId: string): Promise<UsecaseResult<any>> {
    const storagePath = `${PET_STORAGE_ROUTE}/${petId}`;
    const result = await getStreamFile(`${storagePath}/profilePhoto`);

    if (result.errorMessage && result.errorMessage === 'Image not found')
    {
        const defaultImagePath = path.join(process.cwd(), 'src/assets/petProfilePhoto.png');
        const stats = fs.statSync(defaultImagePath);
        const stream = fs.createReadStream(defaultImagePath);
        const metadata = { contentType: 'image/png', size: stats.size };

        return { success: true, data: { stream, metadata } };
    }

    return result;
}