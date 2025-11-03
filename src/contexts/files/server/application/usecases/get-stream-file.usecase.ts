import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { storage } from '@/firebase/client';
import { ref, getStream, getMetadata, listAll } from 'firebase/storage';
import path from 'path';

export async function getStreamFile(storagePath: string): Promise<UsecaseResult<any>> {
    try {
        // First, try the direct path in case a full path with extension is provided
        // try {
        //     const directStorageRef = ref(storage, storagePath);
        //     const metadata = await getMetadata(directStorageRef);
        //     const stream = getStream(directStorageRef);

        //     return {
        //         success: true,
        //         data: {
        //             stream,
        //             metadata,
        //         }
        //     };
        // } catch (error: any) {
        //     if (error.code !== 'storage/object-not-found') {
        //         throw error; // re-throw if it's not a "not found" error
        //     }
        //     // if it is "not found", proceed to search without extension
        // }

        const dirname = path.dirname(storagePath);
        const basename = path.basename(storagePath);
        const dirRef = ref(storage, dirname);
        const res = await listAll(dirRef);

        const foundItem = res.items.find(itemRef => {
            return path.parse(itemRef.name).name === basename;
        });

        if (foundItem) {
            const metadata = await getMetadata(foundItem);
            const stream = getStream(foundItem);
            return {
                success: true,
                data: {
                    stream,
                    metadata,
                }
            };
        }

        return {
            success: false,
            errorMessage: 'Image not found',
        };

    } catch (error: any) {
        if (error.code === 'storage/object-not-found') {
            return {
                success: false,
                errorMessage: 'Image not found',
            }
        }
        const errorMessage = error.message || 'An unexpected error occurred';
        return {
            success: false,
            errorMessage: errorMessage,
        }
    }
};