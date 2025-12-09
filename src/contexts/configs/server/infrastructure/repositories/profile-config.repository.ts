import { db } from "@/firebase/client";
import { equalTo, get, orderByChild, push, query, ref, set, update } from "firebase/database";
import { ProfileConfig } from "@/contexts/configs/server/models/profile-config.model";

export class ProfileConfigRepository {
    private static PATH = "profile_configs";

    static async getByProfileId(profileId: string | number): Promise<ProfileConfig | null> {
        const q = query(ref(db, this.PATH), orderByChild("profileId"), equalTo(profileId));
        const snapshot = await get(q);

        if (!snapshot.exists()) return null;

        const data = snapshot.val();
        const key = Object.keys(data)[0];
        const item = data[key];

        const model = new ProfileConfig();
        model.id = key;
        model.profileId = item.profileId;
        model.modeId = item.modeId;
        model.createdAt = new Date(item.createdAt);
        model.updatedAt = new Date(item.updatedAt);

        return model;
    }

    static async save(config: ProfileConfig): Promise<ProfileConfig> {
        if (config.id) {
            // Update
            const updates: any = {
                modeId: config.modeId,
                updatedAt: new Date().toISOString(),
            };
            await update(ref(db, `${this.PATH}/${config.id}`), updates);
            return config;
        } else {
            // Create
            const newRef = push(ref(db, this.PATH));
            config.id = newRef.key as string;
            config.createdAt = new Date();
            config.updatedAt = new Date();

            const data = {
                profileId: config.profileId,
                modeId: config.modeId,
                createdAt: config.createdAt.toISOString(),
                updatedAt: config.updatedAt.toISOString(),
            };

            await set(newRef, data);
            return config;
        }
    }
}
