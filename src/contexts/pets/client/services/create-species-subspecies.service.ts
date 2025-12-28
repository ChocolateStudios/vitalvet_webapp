import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import type { SaveSpeciesResource } from "@/contexts/pets/server/interfaces/api/resources/save-species.resource";
import type { SaveSubspeciesResource } from "@/contexts/pets/server/interfaces/api/resources/save-subspecies.resource";
import type { SpeciesResource } from "@/contexts/pets/server/interfaces/api/resources/species.resource";
import type { SubspeciesResource } from "@/contexts/pets/server/interfaces/api/resources/subspecies.resource";

export async function createSpecies(species: SaveSpeciesResource): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`/api/species`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(species),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo crear la especie",
            };
        }

        const existingSpecies: SpeciesResource = await response.json();

        return {
            data: {
                ...existingSpecies,
            },
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}

export async function createSubspecies(subspecies: SaveSubspeciesResource, speciesId: string | number): Promise<UsecaseResult<any>> {
    try {
        const response = await fetch(`/api/species/${speciesId}/subspecies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subspecies),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return {
                success: false,
                errorMessage: errorData.message || "No se pudo crear la subespecie",
            };
        }


        const existingSubspecies: SubspeciesResource = await response.json();

        return {
            data: {
                ...existingSubspecies,
            },
            success: true,
        };
    } catch (error) {
        return {
            success: false,
            errorMessage: (error as Error).message,
        };
    }
}