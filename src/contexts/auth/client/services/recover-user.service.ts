interface AuthenticationResponse {
    success: boolean;
    message?: string;
}

export function recoverUser(email: string): AuthenticationResponse {
    return {
        success: true,
        message: "Usuario recuperado correctamente",
    };
}