// ===========================
// Índice de Textos - Inglés Estados Unidos
// ===========================

// lanTexts = language texts
export const lanTexts = {
    shared: undefined as typeof import("./_shared.texts").sharedTexts | undefined,
    pets: undefined as typeof import("./pets.texts").petsTexts | undefined,
    profiles: undefined as typeof import("./profiles.texts").profilesTexts | undefined,
};

// Inicialización lazy para evitar problemas de importación circular
import { sharedTexts } from "./_shared.texts";
import { petsTexts } from "./pets.texts";
import { profilesTexts } from "./profiles.texts";

lanTexts.shared = sharedTexts;
lanTexts.pets = petsTexts;
lanTexts.profiles = profilesTexts;
