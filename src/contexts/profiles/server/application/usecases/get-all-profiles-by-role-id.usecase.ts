import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { UsersRepository } from "@/contexts/auth/server/infrastructure/repositories/users.repository";
import { ProfilesRepository } from "@/contexts/profiles/server/infrastructure/repositories/profiles.repository";
import { RolesRepository } from "@/contexts/profiles/server/infrastructure/repositories/roles.repository";

export async function getAllProfilesByRoleId(roleId: string, userId?: string): Promise<UsecaseResult<any>> {
    if (!userId) {
        throw new Error('No se encontró user Id.');
    }

    const user = await UsersRepository.getUser(userId);
    if (!user) {
        throw new Error('No se encontró el usuario.');
    }

    const authenticatedProfile = await ProfilesRepository.getProfileByUserId(userId);
    const profilesWithRole = await ProfilesRepository.getAllProfilesByRoleId(roleId);

    // Usamos un Map para manejar eficientemente los perfiles y evitar duplicados.
    // La consulta a la BD ya debería incluir al usuario autenticado si tiene el rol correcto,
    // pero este enfoque es más robusto ante cualquier inconsistencia.
    const profileMap = new Map(profilesWithRole.map(p => [p.id, p]));

    // Aseguramos que el perfil del usuario autenticado esté en la lista si tiene el rol correcto.
    if (authenticatedProfile.roleId === roleId) {
        profileMap.set(authenticatedProfile.id, {
            ...authenticatedProfile,
            me: true,
        });
    }

    return {
        data: Array.from(profileMap.values()),
        success: true,
    }
}