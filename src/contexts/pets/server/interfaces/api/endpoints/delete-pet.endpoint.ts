import { deletePet } from "@/contexts/pets/server/application/usecases/delete-pet.usecase";

// `/api/pets/${petId}`
export const DELETEPet = async ({ params }: { params: any }) => {
    const { petId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }

    try {
        await deletePet(petId);
        return new Response(null, { status: 204 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
