// src/contexts/auth/services/jwt.service.ts
import jwt from 'jsonwebtoken';

interface JwtPayload {
    userId: string;
}

const JWT_SECRET = import.meta.env.JWT_SECRET;
const JWT_EXPIRES_IN = '30d'; // Token válido por 7 días

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET no está definida en las variables de entorno. Asegúrate de crear  un archivo .env');
}

/**
 * Genera un token JWT para un usuario.
 * @param payload El payload que se incluirá en el token, debe contener `userId`.
 * @returns El token JWT firmado.
 */
export function generateToken(payload: JwtPayload): string {
     return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    });
}

/**
 * Verifica y decodifica un token JWT.
 * Lanza un error si el token es inválido o ha expirado.
 * @param  token El token JWT a verificar.
 * @returns El payload del token decodificado.
 */
export function verifyToken(token: string): JwtPayload {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded as JwtPayload;
    } catch  (error) {
        console.error("Error al verificar el token:", error);
        throw new Error("Token inválido o expirado.");
    }
}
