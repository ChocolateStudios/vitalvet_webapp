/**
 * Formatea un objeto Date o una cadena de fecha al formato "dd/MM/YYYY". Opcionalmente puede incluir la hora.
 * @param {Date | string} dateOrString - El objeto Date o la cadena de fecha a formatear.
 * @param {boolean} [includeTime=false] - Si es `true`, incluye la hora en el formato "hh:mm am/pm".
 * @returns {string} La fecha formateada o una cadena vacía si la fecha no es válida.
 */
export function formatDateToDdMmYyyyHhMm(dateOrString: Date | string, includeTime: boolean = false): string {
    if (!dateOrString) {
        return '';
    }

    const date = typeof dateOrString === 'string' ? new Date(dateOrString) : dateOrString;

    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return '';
    }

    // Usar métodos UTC para evitar conversión a zona horaria local
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = date.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    if (!includeTime) {
        return formattedDate;
    }

    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    const formattedHours = String(hours).padStart(2, '0');

    return `${formattedDate} ${formattedHours}:${minutes} ${ampm}`;
}

/**
 * Convierte una cadena de fecha y la formatea a "dd/MM/YYYY". Opcionalmente puede incluir la hora.
 * @param {string} dateString - La cadena de fecha a convertir y formatear.
 * @param {boolean} [includeTime=false] - Si es `true`, incluye la hora en el formato "hh:mm am/pm".
 * @returns {string} La fecha formateada o una cadena vacía si la cadena no es válida.
 */
export function formatDateStringToDdMmYyyyHhMm(dateString: string, includeTime: boolean = false) {
    return formatDateToDdMmYyyyHhMm(dateString, includeTime);
}