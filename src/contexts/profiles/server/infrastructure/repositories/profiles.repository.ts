import { ProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/profile.resource";
import { db } from "@/firebase/client";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import type { Profile } from "@/contexts/profiles/server/models/profile.model";

const PROFILES_PATH = 'profiles';

export class ProfilesRepository {
    static async getProfileByUserId(userId: string): Promise<ProfileResource> {
        const profilesCollectionRef = ref(db, PROFILES_PATH);

        // Construye la consulta para filtrar por username en el servidor
        const profileQuery = query(profilesCollectionRef, orderByChild('userId'), equalTo(userId));
        const snapshot = await get(profileQuery);

        if (!snapshot.exists()) {
            throw new Error(`Perfil no encontrada con el user id ${userId}`);
        }

        const profilesData = snapshot.val();
        const profileId = Object.keys(profilesData)[0];
        const profileData = profilesData[profileId];

        const profileModel: Profile = {
            ...profileData,
            id: profileId,
            birthday: new Date(profileData.birthday),
            createdAt: new Date(profileData.createdAt),
            updatedAt: new Date(profileData.updatedAt),
        };

        return ProfileResource.fromModel(profileModel);
    }
}