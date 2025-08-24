import type { Pet } from "@/contexts/pets/server/models/pet.model";
import type { PetResource } from "@/contexts/pets/server/interfaces/api/resources/pet.resource";

export interface PetListItemInfo extends Pet {
    medicalAppointmentsCount: number,
    owner?: string,
}

export async function getAllPets(baseUrl: string = ''): Promise<PetListItemInfo[]> {
    try {
        const response = await fetch(`${baseUrl}/api/pets`);
        const pets = await response.json();
        const petsInfo = pets.map((pet: PetResource) => {
            return {
                ...pet,
                lastVisit: new Date(2025, 0, 15, 3, 5, 12),
                appointmentCount: 1,
            };
        });

        return petsInfo;
    } catch (error) {
        console.error("Error fetching pets:", error);
        return [];
    }
}