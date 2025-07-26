import type { Pet } from "@/contexts/pets/models/pet.model";
import { PetsApiMock } from "@/contexts/pets/services/mock/pets.mock";
import type { PetResource } from "@/contexts/pets/services/resources/pet.resource";

interface PetListItemInfo extends Pet {
    lastVisit: Date,
    appointmentCount: number,
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

export function getAllPetsMocked(): PetListItemInfo[] {
    const pets = PetsApiMock.getAllPets();
    const petsInfo = pets.map(pet => {
        return {
            ...pet,
            lastVisit: new Date(2025, 0, 15, 3, 5, 12),
            appointmentCount: 1,
        };
    })

    return petsInfo;
}