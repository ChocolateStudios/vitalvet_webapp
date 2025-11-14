import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import type { FilePerEntity } from "@/contexts/files/server/models/file-per-entity.model";

export class FilePerEntityResource extends AuditableModel {
    public fileName: string = "";
    public fileUrl: string = "";
    public entityId: number | string = 0;
    public entityRecordId: number | string = 0;

    constructor(model: FilePerEntity) {
        super();
        this.id = model.id;
        this.fileName = model.fileName;
        this.fileUrl = model.fileUrl;
        this.entityId = model.entityId;
        this.entityRecordId = model.entityRecordId;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }

    static fromModel(model: FilePerEntity) {
        return new FilePerEntityResource(model);
    }
}