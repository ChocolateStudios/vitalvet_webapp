// ===========================
// Textos del Contexto: Calendario (Calendar)
// Idioma: Español Perú
// ===========================

import { pluralize } from "../../pluralize";
import { sharedTexts } from "./_shared.texts";

const shared = sharedTexts;

const entity = "calendario";
const entityPlural = pluralize(entity);
const Entity = entity.charAt(0).toUpperCase() + entity.slice(1);

export const calendarTexts = {
    terms: {
        entity,
        entityPlural,
        Entity,
    },
}