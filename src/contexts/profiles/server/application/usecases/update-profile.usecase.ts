import { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export async function updateProfile(body: any, userId?: string): Promise<UsecaseResult<any>> {
    if (!userId) {
        throw new Error('No se encontró user Id.');
    }

    const saveResource = new SaveProfileResource(
        body.name,
        body.lastname,
        body.roleId,
        body.phone,
        new Date(body.birthday)
    );

    const newProfile = await ProfilesRepository.updateProfile(userId, saveResource);

    return {
        data: newProfile,
        success: true,
    };
}