import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { UsersRepository } from "@/contexts/auth/server/infrastructure/repositories/users.repository";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import { RolesRepository } from "@/contexts/profiles/server/infrastructure/repositories/roles.repository";

export async function getMyProfile(userId?: string | number): Promise<UsecaseResult<any>> {
    if (!userId) {
        throw new Error('No se encontró user Id.');
    }

    const user = await UsersRepository.getUser(userId);
    if (!user) {
        throw new Error('No se encontró el usuario.');
    }

    const profile = await ProfilesRepository.getProfileByUserId(userId);
    const role = await RolesRepository.getRoleById(profile.roleId);
    // profile.email = user.username;
    profile.roleName = role.name;

    return {
        data: profile,
        success: true,
    }
}

export async function getProfileById(profileId?: string | number): Promise<UsecaseResult<any>> {
    if (!profileId) {
        throw new Error('No se encontró profile Id.');
    }

    try {
        const profile = await ProfilesRepository.getProfileById(profileId);
        const role = await RolesRepository.getRoleById(profile.roleId);
        profile.roleName = role.name;

        return {
            data: profile,
            success: true,
        }
    }
    catch (error) {
        return {
            data: undefined,
            success: false,
        };
    }
}