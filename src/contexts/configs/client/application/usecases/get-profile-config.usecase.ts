import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { ProfileConfig } from "@/contexts/configs/server/models/profile-config.model";

export async function getProfileConfig(profileId: string): Promise<UsecaseResult<ProfileConfig | null>> {
    const response = await fetch(`/api/configs/profile?profileId=${profileId}`);
    const result = await response.json();
    return result;
}
