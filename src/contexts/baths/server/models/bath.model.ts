import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";

export class Bath extends AuditableModel {
    public bathDate: Date = new Date();
    public observations: string = "";
    public petId: number | string = 0;
    public doctorProfileId: number | string = 0;
    public imageURL?: string;
}