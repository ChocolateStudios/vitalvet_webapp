import type { UsecaseResult } from "@/contexts/_shared/client/usecases/usecase-result";
import { storage } from '@/firebase/client';
import { ref, getStream, getMetadata } from 'firebase/storage';

export async function getStreamFile(storagePath: string): Promise<UsecaseResult<any>> {
    try {
        const storageRef = ref(storage, storagePath);
        const metadata = await getMetadata(storageRef);
        const stream = getStream(storageRef);

        return {
            success: true,
            data: {
                stream,
                metadata,
            }
        }

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