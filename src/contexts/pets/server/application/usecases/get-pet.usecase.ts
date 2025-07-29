import type { Pet } from "@/contexts/pets/server/models/pet.model";
import { PetsRepository } from "@/contexts/pets/server/infrastructure/repositories/pets.repository";

export interface PetInfo extends Pet {
    ownerName: string;
}

export async function getPet(petId: string): Promise<Response> {
    try {
        const pet = await PetsRepository.getPet(petId);
        const petInfo: PetInfo = {
            ...pet,
            birthday: new Date(pet.birthday),
            ownerName: "John Doe"
        };
        return new Response(JSON.stringify(petInfo), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        console.error("Error fetching pet:", errorMessage); // Loguear el error real para depuración
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
}