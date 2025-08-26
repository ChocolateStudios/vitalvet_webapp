import type { Subspecies } from "@/contexts/pets/server/models/subspecies.model";

export class SaveSubspeciesResource {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    public toModel(): Subspecies {
        return {
            id: 0,
            name: this.name,
            speciesId: 0,
        }
    }
}