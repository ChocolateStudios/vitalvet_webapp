import type { ServiceResult } from "@/contexts/_shared/client/services/service-result";
import { uploadFile } from "@/contexts/files/client/services/upload-file.service";
import type { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";

export async function uploadPetProfileImage(petId: string,  file: SaveFileResource): Promise<ServiceResult<any>> {
    return await uploadFile(file, `/api/pets/${petId}/image`);
}