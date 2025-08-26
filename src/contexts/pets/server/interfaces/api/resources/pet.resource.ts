import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import { PetStatus } from "@/contexts/pets/server/models/pet-status.enum";
import type { Pet } from "@/contexts/pets/server/models/pet.model";

export class PetResource extends AuditableModel {
    public name: string = "";
    // public species: string = "";
    // public subspecies: string = "";
    public imgUrl: string = "";
    public birthday: Date = new Date();
    public medicalAppointmentsCount: number = 0;
    public status: string = "";
    public subspeciesId: number | string = 0;
    public ownerProfileId: number | string = 0;

    public constructor() {
        super();
    }

    public static fromModel(model: Pet): PetResource {
        const resource = new PetResource();
        resource.id = model.id;
        resource.name = model.name;
        // resource.species = model.species;
        // resource.subspecies = model.subspecies;
        resource.imgUrl = model.imgUrl;
        resource.birthday = model.birthday;
        resource.status = String(model.status);
        resource.subspeciesId = model.subspeciesId;
        resource.ownerProfileId = model.ownerProfileId;
        resource.createdAt = model.createdAt;
        resource.updatedAt = model.updatedAt;
        return resource;
    }
}