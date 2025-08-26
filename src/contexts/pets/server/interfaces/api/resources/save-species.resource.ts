import type { Species } from "@/contexts/pets/server/models/species.model";

export class SaveSpeciesResource {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public toModel(): Species {
        return {
            id: 0,
            name: this.name,
        }
    }
}