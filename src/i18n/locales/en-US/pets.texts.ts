// ===========================
// Textos del Contexto: Mascotas (Pets)
// Idioma: Español Perú
// ===========================

import { pluralize } from "../../pluralize";
import { sharedTexts } from "./_shared.texts";

const shared = sharedTexts;

// =====================================
// TÉRMINOS BASE DEL CONTEXTO
// =====================================
const entity = "pet";
const entityPlural = pluralize(entity); // → "pets" (automático)
const entityArticle = "the";
const entityArticlePlural = "the";

// Capitalizado para títulos
const Entity = entity.charAt(0).toUpperCase() + entity.slice(1);
const EntityPlural = entityPlural.charAt(0).toUpperCase() + entityPlural.slice(1);

// =====================================
// MENSAJES (combinan globales + términos locales)
// =====================================
export const petsTexts = {
    // Términos exportados para uso externo si es necesario
    terms: {
        entity,
        entityPlural,
        entityArticle,
        entityArticlePlural,
        Entity,
        EntityPlural,
    },

    // Títulos de páginas
    titles: {
        list: EntityPlural, // "Mascotas"
        detail: `Data of ${entityArticle} ${entity}`, // "Datos de la mascota"
        create: `New ${entity}`, // "Nueva mascota"
    },
} as const;
