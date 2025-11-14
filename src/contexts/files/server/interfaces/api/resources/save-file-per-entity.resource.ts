import type { FilePerEntity } from "@/contexts/files/server/models/file-per-entity.model";

export class SaveFilePerEntityResource {
    public fileName: string = "";
    public fileUrl: string = "";
    public entityId: number | string = 0;
    public entityRecordId: number | string = 0;

    constructor(fileName: string, fileUrl: string, entityId: number | string, entityRecordId: number | string) {
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.entityId = entityId;
        this.entityRecordId = entityRecordId;
    }
    
    public toModel(): FilePerEntity {
        return {
            ...this,
            id: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
}