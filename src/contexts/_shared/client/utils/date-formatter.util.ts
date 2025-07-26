const CUTOFFS = [
    { unit: 'year', seconds: 60 * 60 * 24 * 365 },
    { unit: 'month', seconds: 60 * 60 * 24 * 30 },
    { unit: 'week', seconds: 60 * 60 * 24 * 7 },
    { unit: 'day', seconds: 60 * 60 * 24 },
    { unit: 'hour', seconds: 60 * 60 },
    { unit: 'minute', seconds: 60 },
    { unit: 'second', seconds: 1 },
];

type TimeUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second';

/**
 * Formatea una fecha en un texto relativo al tiempo actual (ej. "hace 5 minutos").
 * @param dateString La fecha en formato de cadena (ej. '2023-10-27T10:00:00Z').
 * @param lang El idioma para el formato (por defecto 'es' para español).
 * @returns Una cadena con el tiempo relativo.
 */
export function formatRelativeTimeFromString(dateString: string, lang: string = 'es'): string {
    const date = new Date(dateString);
    const now = new Date();
    
    // Diferencia en segundos
    const diffInSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

    // Usamos Intl.RelativeTimeFormat para obtener el formato correcto en el idioma deseado.
    // { numeric: 'auto' } permite textos como "ayer" en lugar de "hace 1 día".
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });

    for (const { unit, seconds } of CUTOFFS) {
        if (diffInSeconds >= seconds) {
            const value = Math.round(diffInSeconds / seconds);
            return rtf.format(-value, unit as TimeUnit);
        }
    }

    return rtf.format(0, 'second');
}


/**
 * Formatea una fecha en un texto relativo al tiempo actual (ej. "hace 5 minutos").
 * @param dateString La fecha.
 * @param lang El idioma para el formato (por defecto 'es' para español).
 * @returns Una cadena con el tiempo relativo.
 */
export function formatRelativeTime(dateString: Date, lang: string = 'es'): string {
    const date = new Date(dateString);
    const now = new Date();
    
    // Diferencia en segundos
    const diffInSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

    // Usamos Intl.RelativeTimeFormat para obtener el formato correcto en el idioma deseado.
    // { numeric: 'auto' } permite textos como "ayer" en lugar de "hace 1 día".
    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });

    for (const { unit, seconds } of CUTOFFS) {
        if (diffInSeconds >= seconds) {
            const value = Math.round(diffInSeconds / seconds);
            return rtf.format(-value, unit as TimeUnit);
        }
    }

    return rtf.format(0, 'second');
}