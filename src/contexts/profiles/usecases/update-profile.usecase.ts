import type { UsecaseResult } from "@/contexts/_shared/usecases/usecase-result";
import type { SaveProfileResource } from "../services/resources/save-profile.resource";

export async function updateProfile(token: string, profile: SaveProfileResource, baseUrl: string = ''): Promise<UsecaseResult<any>> {
    return {
        success: true,
    };
}