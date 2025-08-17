import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { SaveUserResource } from "@/contexts/auth/server/interfaces/api/resources/save-user.resource";
import { UsersRepository } from "@/contexts/auth/server/infrastructure/repositories/users.repository";

export async function registerUser(body: any): Promise<UsecaseResult<any>> {
    const saveResource = new SaveUserResource(
        body.username,
        body.password,
    );

    const authenticatedUser = await UsersRepository.registerUser(saveResource);

    return {
        data: authenticatedUser,
        success: true,
    };
};
