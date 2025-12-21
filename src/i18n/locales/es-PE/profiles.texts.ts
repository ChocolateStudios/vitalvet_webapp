// ===========================
// Textos del Contexto: Perfiles (Profiles)
// Idioma: Español Perú
// ===========================

import { pluralize } from "../../pluralize";
import { sharedTexts } from "./_shared.texts";

const shared = sharedTexts;

const entity = "perfil";
const entityPlural = pluralize(entity);
const Entity = entity.charAt(0).toUpperCase() + entity.slice(1);

export const profilesTexts = {
    terms: {
        entity,
        entityPlural,
        Entity,
        owner: "dueño",
    },

    labels: {
        names: "Nombres",
        lastnames: "Apellidos",
        email: "Correo electrónico",
        phone: "Teléfono",
        role: "Rol",
        birthDate: "Fecha de nacimiento",
    },

    actions: {
        createOwner: `${shared.actions.create} dueño`, // "Crear dueño"
        addOwner: `${shared.actions.add} dueño`, // "Añadir dueño" (usado en modal title)
        creatingOwner: "Creando dueño...",
        updatingOwner: "Actualizando dueño...",
    },

    roles: {
        owner: "Dueño",
    },
} as const;
