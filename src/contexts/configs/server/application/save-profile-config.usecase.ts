import { ProfileConfigRepository } from "@/contexts/configs/server/infrastructure/repositories/profile-config.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { ProfileConfig } from "@/contexts/configs/server/models/profile-config.model";

export async function saveProfileConfig(data: { profileId: string, modeId: string, userId: string }): Promise<UsecaseResult<ProfileConfig | null>> {
    if (!data.profileId || !data.modeId) {
        return { success: false, data: null, errorMessage: "Profile ID and Mode ID are required" };
    }

    try {
        let config = await ProfileConfigRepository.getByProfileId(data.profileId);

        if (!config) {
            config = new ProfileConfig();
            config.profileId = data.profileId;
        }

        config.modeId = data.modeId;

        const savedConfig = await ProfileConfigRepository.save(config);

        return {
            success: true,
            data: savedConfig,
        };
    } catch (error) {
        console.error("Error saving profile config:", error);
        return {
            success: false,
            data: null,
            errorMessage: "Error saving profile config",
        };
    }
}
