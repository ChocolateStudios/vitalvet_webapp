import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { GlobalModeConfig } from "@/contexts/configs/server/models/others/global-mode-config.model";

export async function getGlobalModes(): Promise<UsecaseResult<GlobalModeConfig[]>> {
    const response = await fetch("/api/configs/modes");
    const result = await response.json();
    return result;
}
