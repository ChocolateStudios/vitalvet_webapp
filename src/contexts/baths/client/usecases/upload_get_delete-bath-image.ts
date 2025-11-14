import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { uploadFile } from "@/contexts/files/client/usecases/upload-file.usecase";
import type { SaveFileResource } from "@/contexts/files/server/interfaces/api/resources/save-file.resource";

export async function uploadBathImage(petId: string, bathId: string, file: SaveFileResource): Promise<UsecaseResult<any>> {
    return await uploadFile(file, `/api/pets/${petId}/baths/${bathId}/image`);
}