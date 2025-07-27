import type { Pet } from "@/contexts/pets/server/models/pet.model";
import type { PetResource } from "@/contexts/pets/server/interfaces/api/resources/pet.resource";
import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";

export interface PetListItemInfo extends Pet {
    lastVisit: Date,
    appointmentCount: number,
}

export async function getAllPets(): Promise<Response> {
    try {
        const pets = await PetsRepository.getAllPets();
        const petsInfo = pets.map((pet: PetResource) => {
            return {
                ...pet,
                appointmentCount: 1,
            };
        });
        return new Response(JSON.stringify(petsInfo), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching all pets:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
}