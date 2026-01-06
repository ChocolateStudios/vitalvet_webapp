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

        const dataToSave = {
            ...newFile,
            createdAt: newFile.createdAt.toISOString(),
            updatedAt: newFile.updatedAt.toISOString(),
        };

        await set(newFileRef, dataToSave);

        newFile.id = imageId;

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
        // Firebase Realtime Database doesn't support multiple orderByChild in the same query
        // So we query by entityId and filter by entityRecordId in memory
        const queryByEntityId = query(filesRef, orderByChild('entityId'), equalTo(entityId));

        const snapshot = await get(queryByEntityId);
        if (!snapshot.exists()) return [];

        const filesData = snapshot.val();

        // Filter by entityRecordId in memory
        const filteredFiles = Object.keys(filesData)
            .filter(key => filesData[key].entityRecordId === entityRecordId)
            .map(key => ({
                ...filesData[key],
                id: key,
                createdAt: new Date(filesData[key].createdAt),
                updatedAt: new Date(filesData[key].updatedAt),
            }));

        return filteredFiles.map(file => FilePerEntityResource.fromModel(file));
    }
}
