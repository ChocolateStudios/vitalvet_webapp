import { get, push, ref, remove, set, update } from "firebase/database";
import { db } from "@/firebase/client";
import { SpeciesResource } from "@/contexts/pets/server/interfaces/api/resources/species.resource";
import type { SaveSpeciesResource } from "@/contexts/pets/server/interfaces/api/resources/save-species.resource";
import type { Species } from "@/contexts/pets/server/models/species.model";

export const SPECIES_PATH = 'species';

export class SpeciesRepository {

    static async createSpecies(data: SaveSpeciesResource): Promise<SpeciesResource> {
        const newSpecies: Species = data.toModel();
        
        const speciesCollectionRef = ref(db, SPECIES_PATH);
        const newSpeciesRef = push(speciesCollectionRef);

        const speciesId = newSpeciesRef.key;
        if (!speciesId) {
            throw new Error('No se pudo generar un ID para la nueva especie.');
        }

        newSpecies.id = speciesId; // Asigna el ID único de Firebase

        await set(newSpeciesRef, data);

        return SpeciesResource.fromModel(newSpecies);
    }

    static async updateSpecies(speciesId: string, data: SaveSpeciesResource): Promise<SpeciesResource> {
        const speciesRef = ref(db, `${SPECIES_PATH}/${speciesId}`);
        const snapshot = await get(speciesRef);
        if (!snapshot.exists()) {
            throw new Error(`Especie no encontrada con el id ${speciesId}`);
        }
        
        await update(speciesRef, data);

        return this.getSpecies(speciesId);
    }

    static async deletePet(speciesId: string): Promise<SpeciesResource> {
        const speciesToDelete = await this.getSpecies(speciesId); // Obtenemos el objeto antes de borrarlo para poder devolverlo
        const speciesRef = ref(db, `${SPECIES_PATH}/${speciesId}`);
        await remove(speciesRef);
        return speciesToDelete;
    }

    static async getSpecies(speciesId: string): Promise<SpeciesResource> {
        const speciesRef = ref(db, `${SPECIES_PATH}/${speciesId}`);
        const snapshot = await get(speciesRef);

        if (!snapshot.exists()) {
            throw new Error(`Especie no encontrada con el id ${speciesId}`);
        }

        const speciesData = snapshot.val();
        const speciesModel: Species = {
            ...speciesData,
        };

        const resource = SpeciesResource.fromModel(speciesModel);
        return resource;
    }
    
    static async getAllSpecies(): Promise<SpeciesResource[]> {
        const speciesRef = ref(db, SPECIES_PATH);
        const snapshot = await get(speciesRef);
        if (!snapshot.exists()) return [];

        const allSpeciesData = snapshot.val();
        return Object.keys(allSpeciesData).map(key => {
            const speciesData = allSpeciesData[key];
            const speciesModel: Species = {
                ...speciesData,
                id: key,
            };
            const resource = SpeciesResource.fromModel(speciesModel);
            return resource;
        });
    }
}