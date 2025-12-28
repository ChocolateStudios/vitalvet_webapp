import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";
import { RolesRepository } from "@/contexts/profiles/server/infrastructure/repositories/roles.repository";

export async function getRoleById(roleId?: string): Promise<UsecaseResult<any>> {
    if (!roleId) {
        throw new Error('No se encontró profile Id.');
    }

    try {
        const role = await RolesRepository.getRoleById(roleId);

        return {
            data: role,
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