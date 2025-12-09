import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { ProfileConfig } from "@/contexts/configs/server/models/profile-config.model";

export async function saveProfileConfig(profileId: string, modeId: string, userId: string): Promise<UsecaseResult<ProfileConfig | null>> {
    const response = await fetch("/api/configs/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ profileId, modeId, userId }),
    });
    const result = await response.json();
    return result;
}
