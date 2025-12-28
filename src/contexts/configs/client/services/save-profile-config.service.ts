import type { ServiceResult } from "@/contexts/_shared/client/services/service-result";
import type { ProfileConfig } from "@/contexts/configs/server/models/profile-config.model";

export async function saveProfileConfig(profileId: string, modeId: string, userId: string): Promise<ServiceResult<ProfileConfig | null>> {
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
