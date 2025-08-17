import { get, push, ref, remove, set, update } from "firebase/database";
import type { Pet } from "@/contexts/pets/server/models/pet.model";
import { PetResource } from "@/contexts/pets/server/interfaces/api/resources/pet.resource";
import type { SavePetResource } from "@/contexts/pets/server/interfaces/api/resources/save-pet.resource";
import { db } from "@/firebase/client";

export const PETS_PATH = 'pets';

export class PetsRepository {

    static async registerPet(data: SavePetResource): Promise<PetResource> {
        const newPet: Pet = data.toModel();
        
        const petsCollectionRef = ref(db, PETS_PATH);
        const newPetRef = push(petsCollectionRef);

        const petId = newPetRef.key;
        if (!petId) {
            throw new Error('No se pudo generar un ID para la nueva mascota.');
        }

        newPet.id = petId; // Asigna el ID único de Firebase

        // Firebase maneja mejor los timestamps como strings ISO o números
        const dataToSave = {
            ...data,
            birthday: newPet.birthday.toISOString(),
            medicalAppointmentsCount: 0,
            createdAt: newPet.createdAt.toISOString(),
            updatedAt: newPet.updatedAt.toISOString(),
        };

        await set(newPetRef, dataToSave);

        return PetResource.fromModel(newPet);
    }

    static async updatePet(petId: string, data: SavePetResource): Promise<PetResource> {
        const petRef = ref(db, `${PETS_PATH}/${petId}`);
        const snapshot = await get(petRef);
        if (!snapshot.exists()) {
            throw new Error(`Mascota no encontrada con el id ${petId}`);
        }

        const dataToUpdate = {
            ...data,
            updatedAt: new Date().toISOString(),
        };
        
        await update(petRef, dataToUpdate);

        return this.getPet(petId);
    }

    static async deletePet(petId: string): Promise<PetResource> {
        const petToDelete = await this.getPet(petId); // Obtenemos el objeto antes de borrarlo para poder devolverlo
        const petRef = ref(db, `${PETS_PATH}/${petId}`);
        await remove(petRef);
        return petToDelete;
    }

    static async getPet(petId: string): Promise<PetResource> {
        const petRef = ref(db, `${PETS_PATH}/${petId}`);
        const snapshot = await get(petRef);

        if (!snapshot.exists()) {
            throw new Error(`Mascota no encontrada con el id ${petId}`);
        }

        const petData = snapshot.val();
        const petModel: Pet = {
            ...petData,
            id: petId,
            birthday: new Date(petData.birthday),
            createdAt: new Date(petData.createdAt),
            updatedAt: new Date(petData.updatedAt),
        };

        const resource = PetResource.fromModel(petModel);
        resource.medicalAppointmentsCount = petData.medicalAppointmentsCount || 0;
        return resource;
    }

    static async getAllPets(): Promise<PetResource[]> {
        const petsRef = ref(db, PETS_PATH);
        const snapshot = await get(petsRef);
        if (!snapshot.exists()) return [];

        const petsData = snapshot.val();
        return Object.keys(petsData).map(key => {
            const petData = petsData[key];
            const petModel: Pet = {
                ...petData,
                id: key,
                birthday: new Date(petData.birthday),
                createdAt: new Date(petData.createdAt),
                updatedAt: new Date(petData.updatedAt),
            };
            const resource = PetResource.fromModel(petModel);
            resource.medicalAppointmentsCount = petData.medicalAppointmentsCount || 0;
            return resource;
        });
    }
}