import { ProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/profile.resource";
import { db } from "@/firebase/client";
import { equalTo, get, orderByChild, push, query, ref, set, update } from "firebase/database";
import type { Profile } from "@/contexts/profiles/server/models/profile.model";
import type { SaveProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/save-profile.resource";

export const PROFILES_PATH = 'profiles';

export class ProfilesRepository {
    
    static async createMyProfile(userId: string, saveResource: SaveProfileResource): Promise<ProfileResource> {
        const newProfile: Profile = saveResource.toModel();

        const profilesCollectionRef = ref(db, PROFILES_PATH);
        const newProfileRef = await push(profilesCollectionRef);

        const profileId = newProfileRef.key;
        if (!profileId) {
            throw new Error('No se pudo generar un ID para la nueva mascota.');
        }

        newProfile.id = profileId;

        const dataToSave = {
            ...saveResource,
            userId,
            petsCount: 0,
            birthday: newProfile.birthday.toISOString(),
            createdAt: newProfile.createdAt.toISOString(),
            updatedAt: newProfile.updatedAt.toISOString(),
            avatarURL: newProfile.avatarURL || null,
        };

        await set(newProfileRef, dataToSave);
        return ProfileResource.fromModel(newProfile);
    }

    static async createProfile(saveResource: SaveProfileResource): Promise<ProfileResource> {
        const newProfile: Profile = saveResource.toModel();

        const profilesCollectionRef = ref(db, PROFILES_PATH);
        const newProfileRef = await push(profilesCollectionRef);

        const profileId = newProfileRef.key;
        if (!profileId) {
            throw new Error('No se pudo generar un ID para la nueva mascota.');
        }

        newProfile.id = profileId;

        const dataToSave = {
            ...saveResource,
            userId: 'undefined',
            petsCount: 0,
            birthday: newProfile.birthday.toISOString(),
            createdAt: newProfile.createdAt.toISOString(),
            updatedAt: newProfile.updatedAt.toISOString(),
            avatarURL: newProfile.avatarURL || null,
        };

        await set(newProfileRef, dataToSave);
        return ProfileResource.fromModel(newProfile);
    }
    
    static async updateProfileById(profileId: string, saveResource: SaveProfileResource): Promise<ProfileResource> {
        const profileRef = ref(db, `${PROFILES_PATH}/${profileId}`);
        const snapshot = await get(profileRef);

        if (!snapshot.exists()) {
            throw new Error(`Perfil no encontrado con el profile id ${profileId}`);
        }

        const dataToUpdate = {
            ...saveResource,
            birthday: saveResource.birthday.toISOString(),
            updatedAt: (new Date()).toISOString(),
            avatarURL: saveResource.avatarURL || null,
        };

        await update(ref(db, `${PROFILES_PATH}/${profileId}`), dataToUpdate);
        return this.getProfileById(profileId);
    }
    
    static async updateProfileByUserId(userId: string, saveResource: SaveProfileResource): Promise<ProfileResource> {
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
            avatarURL: saveResource.avatarURL || null,
        };

        await update(ref(db, `${PROFILES_PATH}/${profileId}`), dataToUpdate);
        return this.getProfileByUserId(userId);
    }

    static async getProfileByUserId(userId: string | number): Promise<ProfileResource> {
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
            avatarURL: profileData.avatarURL,
        };

        return ProfileResource.fromModel(profileModel);
    }

    static async getProfileById(profileId: string | number): Promise<ProfileResource> {
        const profileRef = ref(db, `${PROFILES_PATH}/${profileId}`);
        const snapshot = await get(profileRef);

        if (!snapshot.exists()) {
            throw new Error(`Perfil no encontrado con el id ${profileId}`);
        }

        const profileData = snapshot.val();
        const profileModel: Profile = {
            ...profileData,
            id: profileId,
            birthday: new Date(profileData.birthday),
            createdAt: new Date(profileData.createdAt),
            updatedAt: new Date(profileData.updatedAt),
            avatarURL: profileData.avatarURL,
        };

        return ProfileResource.fromModel(profileModel);
    }

    // DUPLICADO CON EL DE ABAJO
    static async getAllProfilesByIds(profileIds: string[]): Promise<ProfileResource[]> {
        // Crea un array de promesas, donde cada una obtiene un perfil por su ID.
        // Usamos Promise.allSettled para manejar casos donde algunos perfiles no existan,
        // sin que la promesa completa falle.
        const settledPromises = await Promise.allSettled(
            profileIds.map(id => this.getProfileById(id))
        );

        // Filtramos solo las promesas que se cumplieron y extraemos su valor.
        const successfulProfiles = settledPromises
            .filter(result => {
                if (result.status === 'rejected') {
                    console.warn(`No se pudo obtener el perfil:`, result.reason);
                }
                return result.status === 'fulfilled';
            })
            .map(result => (result as PromiseFulfilledResult<ProfileResource>).value);
            
        return successfulProfiles;
    }

    static async getAllProfilesByProfileIds(profileIds: string[]): Promise<ProfileResource[]> {
        const profilesCollectionRef = ref(db, PROFILES_PATH)
        const snapshot = await get(profilesCollectionRef);
        if (!snapshot.exists()) return [];

        const profilesData = snapshot.val();

        return Object.keys(profilesData)
            .filter(profileId => profileIds.includes(profileId))
            .map(profileId => {
                const profileData = profilesData[profileId];
                const profileModel: Profile = {
                    ...profileData,
                    id: profileId,
                    birthday: new Date(profileData.birthday),
                    createdAt: new Date(profileData.createdAt),
                    updatedAt: new Date(profileData.updatedAt),
                    avatarURL: profileData.avatarURL,
                };
                return ProfileResource.fromModel(profileModel);
            });
    }

    static async getAllProfilesByRoleId(roleId: string | number): Promise<ProfileResource[]> {
        const profilesCollectionRef = ref(db, PROFILES_PATH);

        // Construye la consulta para filtrar por username en el servidor
        const profileQuery = query(profilesCollectionRef, orderByChild('roleId'), equalTo(roleId));
        const snapshot = await get(profileQuery);

        if (!snapshot.exists()) {
            return [];
        }

        const profilesData = snapshot.val();
        // Se mapean los resultados a ProfileResource, asegurando la consistencia
        // en la creación de objetos como en otros métodos del repositorio.
        return Object.keys(profilesData).map(profileId => {
            const profileData = profilesData[profileId];
            const profileModel: Profile = {
                ...profileData,
                id: profileId,
                birthday: new Date(profileData.birthday),
                createdAt: new Date(profileData.createdAt),
                updatedAt: new Date(profileData.updatedAt),
                avatarURL: profileData.avatarURL,
            };
            const resource = ProfileResource.fromModel(profileModel);
            resource.petsCount = profileData.petsCount ?? 0;
            return resource;
        });
    }
}