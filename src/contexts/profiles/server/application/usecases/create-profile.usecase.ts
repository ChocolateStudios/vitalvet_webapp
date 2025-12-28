import { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";

export async function createMyProfile(resource: SaveProfileResource, userId?: string): Promise<UsecaseResult> {
    if (!userId) {
        throw new Error('No se encontró user Id.');
    }

    const newProfile = await ProfilesRepository.createMyProfile(userId, resource);

    return {
        data: newProfile,
        success: true,
    };
}

export async function createProfile(resource: SaveProfileResource): Promise<UsecaseResult<any>> {
    const newProfile = await ProfilesRepository.createProfile(resource);

    return {
        data: newProfile,
        success: true,
    };
}