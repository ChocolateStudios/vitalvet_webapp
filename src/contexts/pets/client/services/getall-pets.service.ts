import type { PetResource } from "@/contexts/pets/server/interfaces/api/resources/pet.resource";
import { PetStatus } from "@/contexts/pets/server/models/pet-status.enum";
import type { PetListItemInfo } from "@/contexts/pets/client/usecases/_interfaces";

export async function getAllPets(): Promise<PetListItemInfo[]> {
    try {
        const response = await fetch(`/api/pets`);
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