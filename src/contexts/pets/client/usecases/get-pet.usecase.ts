import type { Pet } from "@/contexts/pets/server/models/pet.model";
import type { PetResource } from "@/contexts/pets/server/interfaces/api/resources/pet.resource";
import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";

export interface PetInfo extends Pet {
    ownerProfileId: number | string;
    ownerName: string;
    medicalAppointmentsCount: number;
    weight: number;
}

// export async function getPet(petId: string, baseUrl: string = ''): Promise<UsecaseResult<PetInfo>> {
//     try {
//         const response = await fetch(`${baseUrl}/api/pets/${petId}`);

//         if (!response.ok) {
//             const errorData = await response.json();
//             return {
//                 success: false,
//                 errorMessage: errorData.message || `Mascota no encontrada con el id ${petId}`,
//             };
//         }

//         const existingPet: PetResource = await response.json();

//         return {
//             data: {
//                 ...existingPet,
//                 birthday: new Date(existingPet.birthday),
//                 ownerProfileId: "1",
//                 ownerName: "John Doe",
//                 weight: 0.0,
//             },
//             success: true,
//         };
//     } catch (error) {
//         return {
//             success: false,
//             errorMessage: (error as Error).message,
//         };
//     }
// }