import { ProfileConfigRepository } from "@/contexts/configs/server/infrastructure/repositories/profile-config.repository";
import { GlobalModeConfigRepository } from "@/contexts/configs/server/infrastructure/repositories/global-mode-config.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { ProfileConfig } from "@/contexts/configs/server/models/profile-config.model";

export async function getProfileConfig(profileId: string | number): Promise<UsecaseResult<ProfileConfig | null>> {
    if (!profileId) {
        return { success: false, data: null, errorMessage: "Profile ID is required" };
    }

    try {
        let config = await ProfileConfigRepository.getByProfileId(profileId);

        if (!config || !config.modeId) {
            const modes = await GlobalModeConfigRepository.getAll();
            const defaultMode = modes.find(m => m.isDefault);

            if (defaultMode) {
                if (!config) {
                    config = new ProfileConfig();
                    config.profileId = profileId;
                }
                config.modeId = defaultMode.id;
            }
        }

        return {
            success: true,
            data: config,
        };
    } catch (error) {
        console.error("Error getting profile config:", error);
        return {
            success: false,
            data: null,
            errorMessage: "Error getting profile config",
        };
    }
}
