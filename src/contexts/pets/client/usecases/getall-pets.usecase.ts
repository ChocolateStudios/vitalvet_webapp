import type { Pet } from "@/contexts/pets/server/models/pet.model";
import type { PetResource } from "@/contexts/pets/server/interfaces/api/resources/pet.resource";
import { PetStatus } from "@/contexts/pets/server/models/pet-status.enum";

export interface PetListItemInfo {
    id?: number | string,
    name?: string,
    medicalAppointmentsCount: number,
    owner?: string,
    species?: string,
    subspecies?: string,
    isDead?: boolean,
}

export async function getAllPets(baseUrl: string = ''): Promise<PetListItemInfo[]> {
    try {
        const response = await fetch(`${baseUrl}/api/pets`);
        const pets = await response.json();
        const petsInfo = pets.map((pet: PetResource) => {
            return {
                ...pet,
                isDead: (pet.status as PetStatus) === PetStatus.Inactive,
            };
        });

        return petsInfo;
    } catch (error) {
        console.error("Error fetching pets:", error);
        return [];
    }
}