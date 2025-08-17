import { ProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/profile.resource";
import { db } from "@/firebase/client";
import { equalTo, get, orderByChild, push, query, ref, set, update } from "firebase/database";
import type { Profile } from "@/contexts/profiles/server/models/profile.model";
import type { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";

const PROFILES_PATH = 'profiles';

export class ProfilesRepository {
    
    static async createProfile(userId: string, saveResource: SaveProfileResource): Promise<ProfileResource> {
        const newProfile: Profile = saveResource.toModel();

        const profilesCollectionRef = ref(db, PROFILES_PATH);
        const newProfileRef = await push(profilesCollectionRef);

        const profileId = newProfileRef.key;
        if (!profileId) {
            throw new Error('No se pudo generar un ID para la nueva mascota.');
        }

        const dataToSave = {
            ...saveResource,
            userId,
            birthday: newProfile.birthday.toISOString(),
            createdAt: newProfile.createdAt.toISOString(),
            updatedAt: newProfile.updatedAt.toISOString(),
        };

        await set(newProfileRef, dataToSave);
        return ProfileResource.fromModel(newProfile);
    }
    
    static async updateProfile(userId: string, saveResource: SaveProfileResource): Promise<ProfileResource> {
        const profilesCollectionRef = ref(db, PROFILES_PATH);

        // Construye la consulta para filtrar por username en el servidor
        const profileQuery = query(profilesCollectionRef, orderByChild('userId'), equalTo(userId));
        const snapshot = await get(profileQuery);

        if (!snapshot.exists()) {
            throw new Error(`Perfil no encontrado con el user id ${userId}`);
        }

        const profilesData = snapshot.val();
        const profileId = Object.keys(profilesData)[0];

        const dataToUpdate = {
            ...saveResource,
            userId,
            birthday: saveResource.birthday.toISOString(),
            updatedAt: (new Date()).toISOString(),
        };

        await update(ref(db, `${PROFILES_PATH}/${profileId}`), dataToUpdate);
        return this.getProfileByUserId(userId);
    }

    static async getProfileByUserId(userId: string): Promise<ProfileResource> {
        const profilesCollectionRef = ref(db, PROFILES_PATH);

        // Construye la consulta para filtrar por username en el servidor
        const profileQuery = query(profilesCollectionRef, orderByChild('userId'), equalTo(userId));
        const snapshot = await get(profileQuery);

        if (!snapshot.exists()) {
            throw new Error(`Perfil no encontrado con el user id ${userId}`);
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