// ===========================
// Textos del Contexto: Mascotas (Pets)
// Idioma: Español Perú
// ===========================

import { pluralize } from "@/i18n/pluralize";
import { createField, sharedTexts } from "@/i18n/locales/es-PE/_shared.texts";

const shared = sharedTexts;

// =====================================
// ENTIDAD: MASCOTA (Pet)
// =====================================
const entity = "mascota";
const entityPlural = pluralize(entity); // → "mascotas" (automático)
const entityArticle = "la";
const entityArticlePlural = "las";
const Entity = entity.charAt(0).toUpperCase() + entity.slice(1);
const EntityPlural = entityPlural.charAt(0).toUpperCase() + entityPlural.slice(1);

// =====================================
// ENTIDAD: DUEÑO (Owner)
// =====================================
const owner = "tutor";
const ownerPlural = "tutores";
const ownerArticle = "el";
const ownerArticlePlural = "los";
export const Owner = owner.charAt(0).toUpperCase() + owner.slice(1);
const OwnerPlural = ownerPlural.charAt(0).toUpperCase() + ownerPlural.slice(1);

// =====================================
// ENTIDAD: ESPECIE (Species)
// =====================================
const species = "especie";
const speciesPlural = pluralize(species);
const speciesArticle = "la";
const speciesArticlePlural = "las";
const Species = species.charAt(0).toUpperCase() + species.slice(1);
const SpeciesPlural = speciesPlural.charAt(0).toUpperCase() + speciesPlural.slice(1);

// =====================================
// ENTIDAD: RAZA (Subspecies)
// =====================================
const subspecies = "raza";
const subspeciesPlural = pluralize(subspecies);
const subspeciesArticle = "la";
const subspeciesArticlePlural = "las";
const Subspecies = subspecies.charAt(0).toUpperCase() + subspecies.slice(1);
const SubspeciesPlural = subspeciesPlural.charAt(0).toUpperCase() + subspeciesPlural.slice(1);

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
        list: "Pacientes", //EntityPlural, // "Mascotas"
        petProfile: (petName: string) => `Revisa y actualiza la información de ${petName}`,
        detail: `Datos de ${entityArticle} ${entity}`, // "Datos de la mascota"
        detailInfo: "Información detallada",
        create: `Nueva ${entity}`, // "Nueva mascota"
    },

    // Acciones (combinan global + entidad)
    actions: {
        create: `${shared.actions.create} ${entity}`, // "Crear mascota"
        delete: `${shared.actions.delete} ${entity}`, // "Eliminar mascota"
        add: `${shared.actions.add} ${entity}`, // "Añadir mascota"
        save: shared.actions.save, // "Guardar cambios" (directo)
    },

    // Feedback (combinan entidad + sufijo global)
    feedback: {
        createSuccess: `${Entity} ${shared.feedback.createdSuccessSuffix}`, // "Mascota creado exitosamente"
        createError: `${shared.feedback.createdErrorPrefix} ${entityArticle} ${entity}`, // "No se pudo crear la mascota"
        updateSuccess: `${Entity} ${shared.feedback.updatedSuccessSuffix}`, // "Mascota actualizado exitosamente"
        updateError: `${shared.feedback.updatedErrorPrefix} ${entityArticle} ${entity}`, // "No se pudo actualizar la mascota"
        deleteSuccess: `${Entity} ${shared.feedback.deletedSuccessSuffix}`, // "Mascota eliminado exitosamente"
        deleteError: `${shared.feedback.deletedErrorPrefix} ${entityArticle} ${entity}`, // "No se pudo eliminar la mascota"
        notFound: `${Entity} ${shared.feedback.notFoundSuffix}`, // "Mascota no encontrado"
        notFoundWithId: (id: string) => `${Entity} no encontrada con id ${id}`, // "Mascota no encontrada con id 123"
    },

    // Diálogos de confirmación
    dialogs: {
        deleteTitle: `${shared.actions.delete} ${entity}`, // "Eliminar mascota"
        deleteConfirm: (name: string) =>
            `¿Estás seguro de que quieres eliminar ${entityArticle} ${entity} ${name}? ` +
            `Una vez que elimines a ${entityArticle} ${entity}, toda su información ` +
            `y citas se perderán para siempre.`,
    },

    // Estados específicos del dominio
    status: {
        alive: `El estado actual de ${entityArticle} ${entity} indica que sigue con vida.`,
        deceased: `El estado actual de ${entityArticle} ${entity} indica que ha fallecido.`,
    },

    // Tablas y listas
    tables: {
        noItems: `No hay ${entityPlural} registradas.`, // "No hay mascotas registradas."
        itemsName: entityPlural, // "mascotas"
    },

    // Fields. Every field has props: { text, validations }
    fields: {
        name: shared.fields.name,
        species: createField(Species, 'F', (val) => ({ // Especie es Femenino (La Especie)
            required: val.required,
        })),
        subspecies: createField(Subspecies, 'F', (val) => ({ // Raza es Femenino (La Raza)
            required: val.required,
        })),
        birthday: shared.fields.birthday,
        weight: { text: "Peso (kg)" },
        age: { text: "Edad (años y meses)" },
        owner: createField(Owner, 'M', (val) => ({ // Dueño es Masculino (El Dueño)
            required: val.required,
        })),
        photo: "Foto",
        isAlive: "Estado de vida",
        status: {
            active: "Activo",
            inactive: "Inactivo",
        },
    },

    tooltips: {
        age: "La edad se autocalcula según la fecha de nacimiento.",
        weight: (hasAppointments: boolean) => hasAppointments
            ? "El peso se obtuvo de la última cita médica."
            : "El peso se obtendrá cuando se registre la primera cita médica.",
    },

    auxiliary: {
        species: {
            term: species,
            label: Species,
            nameLabel: "Nombre",
            addTitle: `Agregar nueva ${species}`,
            createAction: `${shared.actions.create} ${species}`,
        },
        subspecies: {
            term: subspecies,
            label: Subspecies,
            nameLabel: "Nombres",
            addTitle: `Agregar nueva ${subspecies}`,
            createAction: `${shared.actions.create} ${subspecies}`,
        },
        owners: {
            plural: OwnerPlural,
            addTitle: `Agregar nuevo ${Owner}`,
            createAction: `${shared.actions.create} ${Owner}`,
        }
    },
} as const;
