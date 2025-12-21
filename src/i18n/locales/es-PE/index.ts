// ===========================
// Índice de Textos - Español Perú
// ===========================

// lanTexts = language texts
export const lanTexts = {
    shared: undefined as typeof import("@/i18n/locales/es-PE/_shared.texts").sharedTexts | undefined,
    pets: undefined as typeof import("@/i18n/locales/es-PE/pets.texts").petsTexts | undefined,
    profiles: undefined as typeof import("@/i18n/locales/es-PE/profiles.texts").profilesTexts | undefined,
    calendar: undefined as typeof import("@/i18n/locales/es-PE/calendar.texts").calendarTexts | undefined,
    auxiliar: undefined as typeof import("@/i18n/locales/es-PE/auxiliar.texts").auxiliarTexts | undefined,
};

// Inicialización lazy para evitar problemas de importación circular
import { sharedTexts } from "@/i18n/locales/es-PE/_shared.texts";
import { petsTexts } from "@/i18n/locales/es-PE/pets.texts";
import { profilesTexts } from "@/i18n/locales/es-PE/profiles.texts";
import { calendarTexts } from "@/i18n/locales/es-PE/calendar.texts";
import { auxiliarTexts } from "@/i18n/locales/es-PE/auxiliar.texts";

lanTexts.shared = sharedTexts;
lanTexts.pets = petsTexts;
lanTexts.profiles = profilesTexts;
lanTexts.calendar = calendarTexts;
lanTexts.auxiliar = auxiliarTexts;
