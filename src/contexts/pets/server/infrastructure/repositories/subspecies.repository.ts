import { equalTo, get, orderByChild, push, query, ref, remove, set, update } from "firebase/database";
import { db } from "@/firebase/client";
import { SubspeciesResource } from "@/contexts/pets/server/interfaces/api/resources/subspecies.resource";
import type { SaveSubspeciesResource } from "@/contexts/pets/server/interfaces/api/resources/save-subspecies.resource";
import type { Subspecies } from "@/contexts/pets/server/models/subspecies.model";

export const SUBSPECIES_PATH = 'subspecies';

export class SubspeciesRepository {

    static async createSubspecies(data: SaveSubspeciesResource, speciesId: number | string): Promise<SubspeciesResource> {
        const newSubspecies: Subspecies = data.toModel();
        newSubspecies.speciesId = speciesId;
        
        const subspeciesCollectionRef = ref(db, SUBSPECIES_PATH);
        const newSubspeciesRef = push(subspeciesCollectionRef);

        const subspeciesId = newSubspeciesRef.key;
        if (!subspeciesId) {
            throw new Error('No se pudo generar un ID para la nueva especie.');
        }

        newSubspecies.id = subspeciesId; // Asigna el ID único de Firebase

        const dataToSave = {
            ...data,
            speciesId: speciesId,
        };

        await set(newSubspeciesRef, dataToSave);

        return SubspeciesResource.fromModel(newSubspecies);
    }

    static async updateSubspecies(subspeciesId: string, data: SaveSubspeciesResource): Promise<SubspeciesResource> {
        const subspeciesRef = ref(db, `${SUBSPECIES_PATH}/${subspeciesId}`);
        const snapshot = await get(subspeciesRef);
        if (!snapshot.exists()) {
            throw new Error(`Especie no encontrada con el id ${subspeciesId}`);
        }
        
        await update(subspeciesRef, data);

        return this.getSubspecies(subspeciesId);
    }

    static async deletePet(subspeciesId: string): Promise<SubspeciesResource> {
        const subspeciesToDelete = await this.getSubspecies(subspeciesId); // Obtenemos el objeto antes de borrarlo para poder devolverlo
        const subspeciesRef = ref(db, `${SUBSPECIES_PATH}/${subspeciesId}`);
        await remove(subspeciesRef);
        return subspeciesToDelete;
    }

    static async getSubspecies(subspeciesId: string): Promise<SubspeciesResource> {
        const subspeciesRef = ref(db, `${SUBSPECIES_PATH}/${subspeciesId}`);
        const snapshot = await get(subspeciesRef);

        if (!snapshot.exists()) {
            throw new Error(`Especie no encontrada con el id ${subspeciesId}`);
        }

        const subspeciesData = snapshot.val();
        const subspeciesModel: Subspecies = {
            ...subspeciesData,
        };

        const resource = SubspeciesResource.fromModel(subspeciesModel);
        return resource;
    }
    
    static async getAllSubspecies(): Promise<SubspeciesResource[]> {
        const subspeciesRef = ref(db, SUBSPECIES_PATH);
        const snapshot = await get(subspeciesRef);
        if (!snapshot.exists()) return [];

        const allSubspeciesData = snapshot.val();
        return Object.keys(allSubspeciesData).map(key => {
            const subspeciesData = allSubspeciesData[key];
            const subspeciesModel: Subspecies = {
                ...subspeciesData,
                id: key,
            };
            const resource = SubspeciesResource.fromModel(subspeciesModel);
            return resource;
        });
    }
    
    static async getAllSubspeciesBySpeciesId(speciesId: string): Promise<SubspeciesResource[]> {
        const subspeciesCollectionRef = ref(db, SUBSPECIES_PATH);

        // Construye la consulta para filtrar por species en el servidor
        const subspeciesQuery = query(subspeciesCollectionRef, orderByChild('speciesId'), equalTo(speciesId));
        const snapshot = await get(subspeciesQuery);

        if (!snapshot.exists()) {
            return [];
        }

        const allSubspeciesData = snapshot.val();
        
        return Object.keys(allSubspeciesData).map(key => {
            const subspeciesData = allSubspeciesData[key];
            const subspeciesModel: Subspecies = {
                ...subspeciesData,
                id: key,
            };
            const resource = SubspeciesResource.fromModel(subspeciesModel);
            return resource;
        });
    }
}