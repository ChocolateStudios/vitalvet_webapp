import { db } from "@/firebase/client";
import { get, push, query, ref, set, orderByChild, equalTo, remove } from "firebase/database";
import type { Pet } from "@/contexts/pets/models/pet.model";
import type { SavePetResource } from "@/contexts/pets/services/resources/save-pet.resource";
import { PetResource } from "@/contexts/pets/services/resources/pet.resource";

const PETS_PATH = 'pets';

export class PetsApi {
    static async createPet(data: SavePetResource): Promise<PetResource> {
        const newPet: Pet = data.toModel();
        const petsCollectionRef = ref(db, PETS_PATH);
        const newPetRef = push(petsCollectionRef);
        const petId = newPetRef.key;

        if (!petId) {
            throw new Error('No se pudo generar un ID para la nueva mascota.');
        }

        newPet.stringId = petId;

        // Es una buena práctica guardar las fechas como strings ISO en Firebase
        const dataToSave = {
            ...newPet,
            birthday: newPet.birthday.toISOString(),
            createdAt: newPet.createdAt.toISOString(),
            updatedAt: newPet.updatedAt.toISOString(),
        };
        await set(newPetRef, dataToSave);
        return PetResource.fromModel(newPet);
    }

    static async getAllPets(): Promise<PetResource[]> {
        const petsRef = ref(db, PETS_PATH);
        const snapshot = await get(petsRef);

        if (!snapshot.exists()) {
            return [];
        }

        const petsData = snapshot.val();
        return Object.keys(petsData).map(key => PetResource.fromModel({ ...petsData[key], id: key }));
    }

    static async getPetById(petId: string): Promise<PetResource | null> {
        const petRef = ref(db, `${PETS_PATH}/${petId}`);
        const snapshot = await get(petRef);

        if (!snapshot.exists()) {
            return null;
        }

        const petData = snapshot.val();
        return PetResource.fromModel({ 
            ...petData, 
            id: petId,
            stringId: petId,
        });
    }

    static async updatePet(petId: string, data: SavePetResource): Promise<PetResource> {
        const petRef = ref(db, `${PETS_PATH}/${petId}`);
        const snapshot = await get(petRef);

        if (!snapshot.exists()) {
            throw new Error('Mascota no encontrada.');
        }

        const updatedPetData = data.toModel();

        // Es una buena práctica guardar las fechas como strings ISO en Firebase
        const dataToSave = {
            ...updatedPetData,
            birthday: updatedPetData.birthday.toISOString(),
            updatedAt: updatedPetData.updatedAt.toISOString(),
        };

        await set(petRef, dataToSave);
        return PetResource.fromModel({ ...updatedPetData, stringId: petId });
    }

    static async deletePet(petId: string): Promise<void> {
        const petRef = ref(db, `${PETS_PATH}/${petId}`);
        const snapshot = await get(petRef);

        if (!snapshot.exists()) {
            throw new Error('Mascota no encontrada.');
        }

        await remove(petRef);
    }
}
