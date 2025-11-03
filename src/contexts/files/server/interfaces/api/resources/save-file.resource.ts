import type { File } from "@/contexts/files/server/models/file.model";

export class SaveFileResource {
    fileContent: globalThis.File | null = null;
    fileName: string = '';
    fileExtension: string = '';
    fileContentType: string = '';
    fileSize: number = 0;
    storagePath: string = '';

    constructor(fileContent: globalThis.File | null, fileName: string, fileExtension: string, fileContentType: string, fileSize: number, storagePath: string = '') {
        this.fileContent = fileContent;
        this.fileName = fileName;
        this.fileExtension = fileExtension;
        this.fileContentType = fileContentType;
        this.fileSize = fileSize;
        this.storagePath = storagePath;
    }
    
    toModel(): Partial<File> {
        return {
            fileContent: this.fileContent,
            fileName: this.fileName,
            fileExtension: this.fileExtension,
            fileContentType: this.fileContentType,
            fileSize: this.fileSize,
            storagePath: this.storagePath,
        };
    }
}
