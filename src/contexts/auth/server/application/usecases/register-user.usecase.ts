import type { UsecaseResult } from "@/contexts/_shared/server/application/usecases/usecase-result";
import { SaveUserResource } from "@/contexts/auth/server/interfaces/api/resources/save-user.resource";
import { UsersRepository } from "@/contexts/auth/server/infrastructure/repositories/users.repository";

export async function registerUser(saveResource: SaveUserResource): Promise<UsecaseResult> {
    const authenticatedUser = await UsersRepository.registerUser(saveResource);

    return {
        data: authenticatedUser,
        success: true,
    };
};
