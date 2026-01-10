import { UsersRepository } from "@/contexts/auth/server/infrastructure/repositories/users.repository";
import { verifyToken } from "@/contexts/auth/server/utils/jwt.util";

export async function getAuthenticatedUserId(token?: string) {
    if (!token) {
        return new Response(JSON.stringify({ message: 'No autorizado: Token no encontrado en las cookies.' }), { status: 401 });
    }

    let userId: string;

    try {
        // 2. Verificar y decodificar el token usando tu función `verifyToken`
        const payload = verifyToken(token);
        // Según tu `JwtPayload`, el ID está en la propiedad `userId`
        if (!payload.userId) {
            return new Response(JSON.stringify({ message: 'Invalid token payload' }), { status: 401 });
        }

        const user = await UsersRepository.getUser(payload.userId);
        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 401 });
        }

        userId = payload.userId;
    } catch (err) {
        // Tu función `verifyToken` ya maneja el error y lanza uno nuevo.
        return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 401 });
    }

    return userId;
}