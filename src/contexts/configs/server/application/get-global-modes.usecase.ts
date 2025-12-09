import { GlobalModeConfigRepository } from "@/contexts/configs/server/infrastructure/repositories/global-mode-config.repository";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { GlobalModeConfig } from "@/contexts/configs/server/models/others/global-mode-config.model";

export async function getGlobalModes(): Promise<UsecaseResult<GlobalModeConfig[]>> {
    try {
        const modes = await GlobalModeConfigRepository.getAll();
        return {
            success: true,
            data: modes,
        };
    } catch (error) {
        console.error("Error getting global modes:", error);
        return {
            success: false,
            data: [],
            errorMessage: "Error getting global modes",
        };
    }
}
