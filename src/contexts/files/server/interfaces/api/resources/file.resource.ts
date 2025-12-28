import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";
import type { File } from "@/contexts/files/server/models/file.model";

export class FileResource extends AuditableModel {
    fileContent: globalThis.File | Buffer | null = null;
    fileName: string = '';
    fileExtension: string = '';
    fileContentType: string = '';
    fileSize: number = 0;
    storagePath: string = '';
    publicURL: string = '';
    
    static fromModel(model: File): FileResource {
        return {
            id: model.id,
            fileContent: model.fileContent,
            fileName: model.fileName,
            fileExtension: model.fileExtension,
            fileContentType: model.fileContentType,
            fileSize: model.fileSize,
            storagePath: model.storagePath,
            publicURL: model.publicURL,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt,
            isActive: model.isActive,
        };
    }
}
