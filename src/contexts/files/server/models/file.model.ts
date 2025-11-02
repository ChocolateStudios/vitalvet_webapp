import { AuditableModel } from "@/contexts/_shared/server/models/auditable.model";

export class File extends AuditableModel {
    fileContent: globalThis.File | null = null;
    fileName: string = '';          // ex: HelloWorld (without extension)
    fileExtension: string = '';     // ex: png
    fileContentType: string = '';   // ex: image/png
    fileSize: number = 0;           // ex: 1235
    storagePath: string = '';       // ex: pets/IOADJDFKJSdsjkaS
    publicURL: string = '';         // ex: https://firebase.io/pets/IOADJDFKJSdsjkaS/HelloWorld.png
}
