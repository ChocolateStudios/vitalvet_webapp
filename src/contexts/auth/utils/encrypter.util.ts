// import bcrypt from 'bcrypt';

// const SALT_ROUNDS = 10; // Un buen valor por defecto para el coste computacional

// /**
//  * Hashea una contraseña en texto plano.
//  * Esta función debe ejecutarse SIEMPRE en el servidor.
//  * @param plaintextPassword La contraseña a hashear.
//  * @returns Una promesa que se resuelve con el hash de la contraseña.
//  */
// export async function hashPassword(plaintextPassword: string): Promise<string> {
//     return bcrypt.hash(plaintextPassword, SALT_ROUNDS);
// }

// /**
//  * Compara una contraseña en texto plano con un hash existente.
//  * Esta función debe ejecutarse SIEMPRE en el servidor.
//  * @param plaintextPassword La contraseña introducida por el usuario.
//  * @param hash El hash guardado en la base de datos.
//  * @returns Una promesa que se resuelve con `true` si coinciden, `false` en caso contrario.
//  */
// export async function comparePassword(plaintextPassword: string, hash: string): Promise<boolean> {
//     return bcrypt.compare(plaintextPassword, hash);
// }




/**
 * ADVERTENCIA DE SEGURIDAD:
 * Este archivo implementa un método de ofuscación simple (Cifrado César + Base64)
 * y NO debe ser considerado seguro. Su propósito es únicamente ocultar
 * temporalmente el texto plano. Es trivial de revertir.
 *
 * Se recomienda encarecidamente migrar a una solución de hashing del lado del servidor
 * (como bcrypt) tan pronto como sea posible.
 */

const SHIFT = 5; // Un número simple para desplazar los caracteres

function caesarCipher(text: string, shift: number): string {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        // Solo se aplica a letras y números para evitar corromper otros caracteres
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || (code >= 48 && code <= 57)) {
            return String.fromCharCode(code + shift);
        }
        return char;
    }).join('');
}

export function obfuscate(text: string): string {
    const shifted = caesarCipher(text, SHIFT);
    // btoa codifica a Base64 (solo funciona en el navegador)
    return btoa(shifted);
}

