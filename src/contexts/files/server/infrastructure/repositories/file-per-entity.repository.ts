import { SaveFilePerEntityResource } from "@/contexts/files/server/interfaces/api/resources/save-file-per-entity.resource";
import { FilePerEntityResource } from "@/contexts/files/server/interfaces/api/resources/file-per-entity.resource";
import { equalTo, get, orderByChild, push, query, ref, remove, runTransaction, set } from "firebase/database";
import { db } from "@/firebase/client";

const FILE_PER_ENTITY_PATH = 'file_per_entity';

export class ImagePerEntityRepository {

    static async addFile(data: SaveFilePerEntityResource): Promise<FilePerEntityResource> {
        const newFile = data.toModel();

        const imagesCollectionRef = ref(db, FILE_PER_ENTITY_PATH);
        const newFileRef = push(imagesCollectionRef);

        const imageId = newFileRef.key;
        if (!imageId) {
            throw new Error('Could not generate ID for new image.');
        }

        newFile.id = imageId;

        const dataToSave = {
            ...newFile,
            createdAt: newFile.createdAt.toISOString(),
            updatedAt: newFile.updatedAt.toISOString(),
        };

        await set(newFileRef, dataToSave);

        return FilePerEntityResource.fromModel(newFile);
    }

    static async deleteFile(filePerEntityId: number | string): Promise<void> {
        const fileRef = ref(db, `${FILE_PER_ENTITY_PATH}/${filePerEntityId}`);
        const snapshot = await get(fileRef);
        if (!snapshot.exists()) {
            throw new Error(`File not found with id ${filePerEntityId}`);
        }

        await remove(fileRef);
    }

    static async getFile(filePerEntityId: number | string): Promise<FilePerEntityResource> {
        const fileRef = ref(db, `${FILE_PER_ENTITY_PATH}/${filePerEntityId}`);
        const snapshot = await get(fileRef);
        if (!snapshot.exists()) {
            throw new Error(`File not found with id ${filePerEntityId}`);
        }

        const fileData = snapshot.val();
        return FilePerEntityResource.fromModel({
            ...fileData,
            id: filePerEntityId,
            createdAt: new Date(fileData.createdAt),
            updatedAt: new Date(fileData.updatedAt),
        });
    }

    static async getFilesByEntityId(entityId: number | string, entityRecordId: number | string): Promise<FilePerEntityResource[]> {
        const filesRef = ref(db, FILE_PER_ENTITY_PATH);
        const queryByEntityRecordId = query(filesRef, orderByChild('entityId'), equalTo(entityId), orderByChild('entityRecordId'), equalTo(entityRecordId));

        const snapshot = await get(queryByEntityRecordId);
        if (!snapshot.exists()) return [];

        const filesData = snapshot.val();

        const imagesList: FilePerEntityResource[] = Object.keys(filesData).map(key => ({
            ...filesData[key],
            id: key,
            createdAt: new Date(filesData[key].createdAt),
            updatedAt: new Date(filesData[key].updatedAt),
        }));

        return imagesList.map(image => FilePerEntityResource.fromModel(image));
    }
}
