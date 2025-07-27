import { AuditableModel } from "../../../_shared/server/models/auditable.model";

export class Pet extends AuditableModel {
    public name: string = "";
    public age: number = 0;
    public weight: number = 0.0;
    public species: string = "";
    public subspecies: string = "";
    public birthday: Date = new Date();
    public imgUrl: string = "";
}