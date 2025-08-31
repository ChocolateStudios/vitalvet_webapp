import { SaveBathResource } from "@/contexts/baths/server/interfaces/api/resources/save-bath.resource";
import type { APIRoute } from "astro";
import { BathsRepository } from "@/contexts/baths/server/infrastructure/repositories/baths.repository";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
    const { petId, bathId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    if (!bathId) {
        return new Response(JSON.stringify({ message: 'Bath ID is required' }), { status: 400 });
    }

    try {
        const appointments = await BathsRepository.getBath(petId, bathId);
        return new Response(JSON.stringify(appointments), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const PUT: APIRoute = async ({ request, params }) => {
    const { petId, bathId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    if (!bathId) {
        return new Response(JSON.stringify({ message: 'Bath ID is required' }), { status: 400 });
    }

    try {
        const body = await request.json();
        const resource = new SaveBathResource(
            new Date(body.bathDate),
            body.observations,
            body.doctorProfileId,
        );
        const updatedPet = await BathsRepository.updateBath(petId, bathId, resource);
        return new Response(JSON.stringify(updatedPet), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ params }) => {
    const { petId, bathId } = params;
    if (!petId) {
        return new Response(JSON.stringify({ message: 'Pet ID is required' }), { status: 400 });
    }
    if (!bathId) {
        return new Response(JSON.stringify({ message: 'Bath ID is required' }), { status: 400 });
    }

    try {
        await BathsRepository.deleteBath(petId, bathId);
        return new Response(null, { status: 204 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
    }
};
