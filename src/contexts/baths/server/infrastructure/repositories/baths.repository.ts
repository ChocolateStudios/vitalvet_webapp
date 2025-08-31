import type { Bath } from "@/contexts/baths/server/models/bath.model";
import { db } from "@/firebase/client";
import { equalTo, get, orderByChild, push, query, ref, remove, runTransaction, set, update } from "firebase/database";
import type { SaveBathResource } from "@/contexts/baths/server/interfaces/api/resources/save-bath.resource";
import { BathResource } from "@/contexts/baths/server/interfaces/api/resources/bath.resource";
import { PETS_PATH } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";

const BATHS_PATH = 'baths';

export class BathsRepository {

    static async registerBath(petId: string, data: SaveBathResource): Promise<BathResource> {
        const newBath: Bath = data.toModel();
        
        const bathsCollectionRef = ref(db, BATHS_PATH);
        const newBathRef = push(bathsCollectionRef);

        const bathId = newBathRef.key;
        if (!bathId) {
            throw new Error('No se pudo generar un ID para el nuevo baño.');
        }

        newBath.id = bathId; // Asigna el ID único de Firebase

        // Firebase maneja mejor los timestamps como strings ISO o números
        const dataToSave = {
            ...data,
            petId: petId,
            bathDate: newBath.bathDate.toISOString(),
            createdAt: newBath.createdAt.toISOString(),
            updatedAt: newBath.updatedAt.toISOString(),
        };

        await set(newBathRef, dataToSave);

        // Incrementa el contador de baños para la mascota usando una transacción
        const petCounterRef = ref(db, `${PETS_PATH}/${petId}/bathsCount`);
        await runTransaction(petCounterRef, (currentCount) => {
            return (currentCount || 0) + 1;
        });

        return BathResource.fromModel(newBath);
    }

    static async updateBath(petId: string, bathId: string, data: SaveBathResource): Promise<BathResource> {
        const bathRef = ref(db, `${BATHS_PATH}/${bathId}`);
        const snapshot = await get(bathRef);
        if (!snapshot.exists()) {
            throw new Error(`Baño no encontrado con el id ${bathId}`);
        }

        const dataToUpdate = {
            ...data,
            updatedAt: new Date().toISOString(),
        };
        
        await update(bathRef, dataToUpdate);

        return this.getBath(petId, bathId);
    }

    static async deleteBath(petId: string, bathId: string): Promise<BathResource> {
        const bathToDelete = await this.getBath(petId, bathId); // Obtenemos el objeto antes de borrarlo para poder devolverlo
        const bathRef = ref(db, `${BATHS_PATH}/${bathId}`);

        // Decrementa el contador de baños para la mascota usando una transacción
        const petCounterRef = ref(db, `${PETS_PATH}/${petId}/bathsCount`);
        await runTransaction(petCounterRef, (currentCount) => {
            // Aseguramos que el contador no sea negativo
            return (currentCount || 0) > 0 ? currentCount - 1 : 0;
        });
        
        await remove(bathRef);
        return bathToDelete;
    }

    static async getBath(petId: string, bathId: string): Promise<BathResource> {
        // Para obtener el número de cita, primero necesitamos todas las citas de la mascota y ordenarlas.
        const allBaths = await this.getAllBathsByPetId(petId);

        // Buscamos la cita específica en la lista ya ordenada.
        const bath = allBaths.find(bath => bath.id === bathId);

        if (!bath) {
            throw new Error(`Baño no encontrado con el id ${bathId} para la mascota con id ${petId}`);
        }

        return bath;
    }

    static async getAllBathsByPetId(petId: string): Promise<BathResource[]> {
        const bathsRef = ref(db, BATHS_PATH);

        // Construye la consulta para filtrar por petId en el servidor
        const queryByPetId = query(bathsRef, orderByChild('petId'), equalTo(petId));

        const snapshot = await get(queryByPetId);
        if (!snapshot.exists()) return [];

        const bathsData = snapshot.val();

        // 1. Convertir el objeto de citas en un array
        const bathsList: Bath[] = Object.keys(bathsData).map(key => ({ 
            ...bathsData[key], 
            id: key,
            bathDate: new Date(bathsData[key].bathDate),
            createdAt: new Date(bathsData[key].createdAt),
            updatedAt: new Date(bathsData[key].updatedAt),
        }));

        // 2. Ordenar el array por fecha de creación (ascendente)
        bathsList.sort((a, b) => a.bathDate.getTime() - b.bathDate.getTime());

        // 3. Convertir el array de citas en un array de recursos
        return bathsList.map((bath, index) => {
            const resource = BathResource.fromModel(bath);
            resource.bathNumber = index + 1;
            return resource;
        })
    }

    static async getLastBathByPetId(petId: string): Promise<BathResource> {
        const allAppointments = await this.getAllBathsByPetId(petId);
        return allAppointments[allAppointments.length - 1];
    }
}