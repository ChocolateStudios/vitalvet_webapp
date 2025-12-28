import type { File } from "@/contexts/files/server/models/file.model";

export class SaveFileResource {
    fileContent: globalThis.File | Buffer | null = null;
    fileName: string = '';
    fileExtension: string = '';
    fileContentType: string = '';
    fileSize: number = 0;
    storagePath: string = '';

    constructor(fileContent: globalThis.File | Buffer | null, fileName: string, fileExtension: string, fileContentType: string, fileSize: number, storagePath: string = '') {
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

    public static fromFormData({ formData, customName, customStoragePath }: { formData: FormData, customName?: string, customStoragePath?: string }): SaveFileResource {
        return new SaveFileResource(
            formData.get('file') as globalThis.File,
            customName || formData.get('filename') as string,
            formData.get('extension') as string,
            formData.get('contentType') as string,
            Number(formData.get('size')),
            customStoragePath || formData.get('path') as string
        );
    }

    public static fromMultipartFormData({ formData, customName, customStoragePath }: { formData: any, customName?: string, customStoragePath?: string }): SaveFileResource {
        return new SaveFileResource(
            formData.fileContent,
            customName || formData.fields.filename,
            formData.fields.extension,
            formData.fileMimeType,
            formData.fields.size,
            customStoragePath || formData.fields.path
        );
    }
}
