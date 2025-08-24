import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import { PetStatus } from "./pet-status.enum";

export class Pet extends AuditableModel {
    public name: string = "";
    public species: string = "";
    public subspecies: string = "";
    public imgUrl: string = "";
    public birthday: Date = new Date();
    public status: PetStatus = PetStatus.Undefined;
}