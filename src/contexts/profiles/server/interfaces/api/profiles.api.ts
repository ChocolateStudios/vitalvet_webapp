import { ProfileResource } from "@/contexts/profiles/server/interfaces/api/resources/profile.resource";
import { db } from "@/firebase/client";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import type { Profile } from "@/contexts/profiles/server/models/profile.model";
import { verifyToken } from "@/contexts/auth/utils/jwt.util";
import type { BaseResponse } from "@/contexts/_shared/server/interfaces/api/responses/base.response";

export class ProfilesApi {
    static async getProfile(token: string): Promise<Response> {
        try {    
            let userId: string;
    
            try {
                // 2. Verificar y decodificar el token usando tu función `verifyToken`
                const payload = verifyToken(token);
                // Según tu `JwtPayload`, el ID está en la propiedad `userId`
                if (!payload.userId) {
                    return new Response(JSON.stringify({ message: 'Invalid token payload' }), { status: 401 });
                }
                userId = payload.userId;
            } catch (err) {
                // Tu función `verifyToken` ya maneja el error y lanza uno nuevo.
                return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 401 });
            }
    
            // 3. Usar el userId para obtener el perfil
            const profile = await ProfilesApi.getProfileByUserId(userId);
            return new Response(JSON.stringify(profile), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
            console.error("Error fetching profile:", errorMessage); // Loguear el error real para depuración
            return new Response(JSON.stringify({ message: errorMessage }), { status: 500 });
        }
    }
}