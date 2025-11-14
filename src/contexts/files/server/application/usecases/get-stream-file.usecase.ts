import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { storage } from '@/firebase/client';
import { ref, getStream, getMetadata, listAll } from 'firebase/storage';
import path from 'path';
import fs from 'fs';

export async function getStreamFile(storagePath: string, defaultItemPath?: string): Promise<UsecaseResult<any>> {
    try {
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

        if (defaultItemPath) {

            const defaultImagePath = path.join(process.cwd(), defaultItemPath);
            const stats = fs.statSync(defaultImagePath);
            const stream = fs.createReadStream(defaultImagePath);
            const metadata = { contentType: 'image/png', size: stats.size };
    
            return { 
                success: true, 
                data: { 
                    stream, 
                    metadata 
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