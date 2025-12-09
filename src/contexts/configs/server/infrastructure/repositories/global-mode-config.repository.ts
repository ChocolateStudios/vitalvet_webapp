import { db } from "@/firebase/client";
import { get, ref } from "firebase/database";
import { GlobalModeConfig } from "@/contexts/configs/server/models/others/global-mode-config.model";

export class GlobalModeConfigRepository {
    private static PATH = "global_mode_configs";

    static async getAll(): Promise<GlobalModeConfig[]> {
        const snapshot = await get(ref(db, this.PATH));
        if (!snapshot.exists()) return [];

        const data = snapshot.val();
        return Object.keys(data).map((key) => {
            const item = data[key];
            const model = new GlobalModeConfig();
            model.id = key;
            model.name = item.name;
            model.isDefault = item.isDefault;
            return model;
        });
    }
}
