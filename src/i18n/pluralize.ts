// ===========================
// Función de Pluralización
// ===========================

/**
 * Genera el plural de una palabra.
 * Por defecto agrega 's', pero permite sobrescribir manualmente.
 *
 * @param singular - La palabra en singular
 * @param pluralOverride - Opcional: plural personalizado para palabras irregulares
 * @returns La forma plural de la palabra
 *
 * @example
 * pluralize("mascota")              // → "mascotas" (automático)
 * pluralize("animal", "animales")   // → "animales" (override manual)
 * pluralize("perfil", "perfiles")   // → "perfiles" (override manual)
 */
export function pluralize(singular: string, pluralOverride?: string): string {
    return pluralOverride ?? `${singular}s`;
}
