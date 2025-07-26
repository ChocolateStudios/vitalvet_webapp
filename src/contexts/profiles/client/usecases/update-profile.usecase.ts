import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SaveProfileResource } from "../../server/interfaces/api/resources/save-profile.resource";

export async function updateProfile(token: string, profile: SaveProfileResource, baseUrl: string = ''): Promise<UsecaseResult<any>> {
    return {
        success: true,
    };
}