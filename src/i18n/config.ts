// ===========================
// Configuración de Idiomas (i18n)
// ===========================

// Detección automática de idiomas existentes en la carpeta locales
// Busca archivos index.ts dentro de src/i18n/locales/[LANG]/
const localeFiles = import.meta.glob("./locales/*/index.ts");

/**
 * Locales soportados detectados automáticamente del sistema de archivos.
 * Extrae el código del idioma de la ruta del archivo (ej: ./locales/es-PE/index.ts -> es-PE)
 */
export const SUPPORTED_LOCALES = Object.keys(localeFiles)
    .map((path) => {
        const match = path.match(/\/locales\/([^/]+)\/index\.ts$/);
        return match ? match[1] : null;
    })
    .filter((locale): locale is string => locale !== null);

/**
 * Tipo para los locales soportados.
 * Al ser dinámico, TypeScript lo infiere como string.
 */
export type SupportedLocale = string;

/**
 * Idioma por defecto de la aplicación.
 *
 * NOTA: En el futuro esto vendrá de GlobalConfig en la base de datos.
 * Por ahora se configura aquí directamente.
 *
 * @default "es-PE" - Español Perú
 */
export const DEFAULT_LOCALE: SupportedLocale = "es-PE";
// export const DEFAULT_LOCALE: SupportedLocale = "en-US";
