import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import type { Pet } from "@/contexts/pets/server/models/pet.model";

export class PetResource extends AuditableModel {
    public name: string = "";
    public imgUrl: string = "";
    public birthday: Date = new Date();
    public medicalAppointmentsCount: number = 0;
    public bathsCount: number = 0;
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


export interface PetExtendedResource extends PetResource {
    ownerName: string;
    medicalAppointmentsCount: number;
    bathsCount: number;
    weight: number;
}