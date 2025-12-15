// ===========================
// Constantes de Entorno
// ===========================

/** Entorno actual (development, pre, pro) */
export const CURRENT_MODE = import.meta.env.MODE;

/** Indica si estamos en entorno de desarrollo */
export const IS_DEV = import.meta.env.DEV;

/** Indica si estamos en entorno de producción (build) */
export const IS_BUILD = import.meta.env.PROD;

/** Indica si estamos en el entorno "pre" (pre-producción) */
export const IS_PRE = import.meta.env.MODE === "pre";

/** Indica si estamos en el entorno "pro" (producción final) */
export const IS_PRO = import.meta.env.MODE === "pro";
