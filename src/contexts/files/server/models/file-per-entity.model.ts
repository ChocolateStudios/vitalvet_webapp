import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";

export class FilePerEntity extends AuditableModel {
    public fileName: string = "";
    public fileUrl: string = "";
    public entityId: number | string = 0;
    public entityRecordId: number | string = 0;
}