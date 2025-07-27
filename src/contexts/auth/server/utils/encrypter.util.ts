import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10; // Un buen valor por defecto para el coste computacional

/**
 * Hashea una contraseña en texto plano.
 * Esta función debe ejecutarse SIEMPRE en el servidor.
 * @param plaintextPassword La contraseña a hashear.
 * @returns Una promesa que se resuelve con el hash de la contraseña.
 */
export async function hashPassword(plaintextPassword: string): Promise<string> {
    return bcrypt.hash(plaintextPassword, SALT_ROUNDS);
}

/**
 * Compara una contraseña en texto plano con un hash existente.
 * Esta función debe ejecutarse SIEMPRE en el servidor.
 * @param plaintextPassword La contraseña introducida por el usuario.
 * @param hash El hash guardado en la base de datos.
 * @returns Una promesa que se resuelve con `true` si coinciden, `false` en caso contrario.
 */
export async function comparePassword(plaintextPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plaintextPassword, hash);
}
