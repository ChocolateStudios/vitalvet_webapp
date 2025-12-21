// ===========================
// Sistema de Internacionalización (i18n)
// Punto de entrada principal
// ===========================

import {
    DEFAULT_LOCALE,
    SUPPORTED_LOCALES,
    type SupportedLocale,
} from "./config";


// =====================================
// Carga Dinámica de Idiomas
// Usa import.meta.glob (Vite) para cargar todos los index.ts de locales
// =====================================
const localesModules = import.meta.glob<any>("./locales/*/index.ts", { eager: true });

const localesMap: Record<string, any> = {};

for (const path in localesModules) {
    // Extraer código de idioma (es-PE, en-US) de la ruta
    const match = path.match(/\/locales\/([^/]+)\/index\.ts$/);
    if (match) {
        const locale = match[1];
        const module = localesModules[path];

        // Validación inteligente: Solo agregamos si exporta lanTexts
        if (module && module.lanTexts) {
            localesMap[locale] = module.lanTexts;
        }
    }
}

// =====================================
// Funciones de acceso a textos
// =====================================

// =====================================
// Cache de idiomas fusionados
// Evita re-procesar el 'deep merge' en cada llamada
// =====================================
const mergedLocalesCache = new Map<SupportedLocale, any>();

/**
 * Utilidad de Fusión Profunda (Deep Merge) para i18n.
 * 
 * ESTRATEGIA:
 * Recorre recursivamente el objeto de textos base (idioma por defecto).
 * Si el idioma objetivo tiene una traducción para una clave, la usa.
 * Si no, conserva el valor del idioma base (Fallback).
 * Esto asegura que la UI nunca muestre espacios vacíos o errores por claves faltantes.
 */
function deepMergeFallback(base: any, target: any): any {
    // Si target no existe, devolvemos base completo (caso base de fallback)
    if (target === undefined || target === null) return base;

    // Si base no es un objeto (es string, number, function, etc.), 
    // devolvemos target si existe, o base si no.
    // Aquí priorizamos la traducción existente en target.
    if (typeof base !== 'object' || base === null || Array.isArray(base)) {
        return target !== undefined ? target : base;
    }

    // Si es un objeto, recorremos sus claves (recursión)
    const result: any = {};

    // 1. Iteramos sobre las claves del BASE para asegurar que todas existan en el resultado
    for (const key in base) {
        if (Object.prototype.hasOwnProperty.call(base, key)) {
            // Recursivamente fusionamos cada propiedad
            result[key] = deepMergeFallback(base[key], target[key]);
        }
    }

    return result;
}

/**
 * Obtiene todos los textos para un idioma específico.
 * Implementa estrategia de Fallback Granular:
 * Si una clave específica falta en el idioma solicitado, 
 * se rellena automáticamente con el valor del idioma por defecto.
 *
 * @param locale - Código del idioma (ej: "es-PE", "en-US")
 * @returns Objeto con todos los textos del idioma (completado con fallbacks)
 */
export function getTexts(locale: SupportedLocale = DEFAULT_LOCALE) {
    // 1. Si es el idioma por defecto, retornamos directo (optimización)
    if (locale === DEFAULT_LOCALE) {
        return localesMap[DEFAULT_LOCALE];
    }

    // 2. Revisamos si ya tenemos este cruce en caché
    if (mergedLocalesCache.has(locale)) {
        return mergedLocalesCache.get(locale);
    }

    const defaultTexts = localesMap[DEFAULT_LOCALE];
    const targetTexts = localesMap[locale];

    // 3. Aplicamos la Estrategia de Fusión Profunda
    // Usamos el idioma por defecto como base y sobreescribimos con lo que exista en el target
    const mergedTexts = deepMergeFallback(defaultTexts, targetTexts);

    // 4. Guardamos en caché para futuras llamadas
    mergedLocalesCache.set(locale, mergedTexts);

    return mergedTexts;
}

/**
 * Obtiene los textos del idioma por defecto.
 * Útil para acceso directo sin especificar locale.
 */
export const texts = getTexts(DEFAULT_LOCALE);

// =====================================
// Re-exportación directa para uso simple
// Estos usan el idioma por defecto (es-PE)
// =====================================
// const sharedTexts = getTexts().shared;
// const petsTexts = getTexts().pets;
// const profilesTexts = getTexts().profiles;
// export { sharedTexts, petsTexts, profilesTexts };

// Los demás se agregarán gradualmente:
// export { calendarTexts } from './locales/es-PE';
// etc.
