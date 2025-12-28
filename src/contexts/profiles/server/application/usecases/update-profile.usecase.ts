import { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";

export async function updateMyProfile(resource: SaveProfileResource, userId?: string): Promise<UsecaseResult> {
    if (!userId) {
        throw new Error('No se encontró user Id.');
    }

    const newProfile = await ProfilesRepository.updateProfileByUserId(userId, resource);

    return {
        data: newProfile,
        success: true,
    };
}

export async function updateProfile(resource: SaveProfileResource, profileId?: string): Promise<UsecaseResult> {
    if (!profileId) {
        throw new Error('No se encontró profile Id.');
    }

    const newProfile = await ProfilesRepository.updateProfileById(profileId, resource);

    return {
        data: newProfile,
        success: true,
    };
}