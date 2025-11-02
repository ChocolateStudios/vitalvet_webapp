import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import { PetStatus } from "./pet-status.enum";

export class Pet extends AuditableModel {
    public name: string = "";
    public imgUrl: string = "";
    public birthday: Date = new Date();
    public status: PetStatus = PetStatus.Undefined;
    public subspeciesId: number | string = 0;
    public ownerProfileId: number | string = 0;
}