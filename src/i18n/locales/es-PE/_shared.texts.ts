// ===========================
// Textos Globales - Español Perú
// ===========================

// =====================================
// ACCIONES GLOBALES
// (reutilizables en todos los contextos)
// =====================================
const actions = {
    create: "Crear",
    save: "Guardar cambios",
    delete: "Eliminar",
    cancel: "Cancelar",
    add: "Añadir",
    edit: "Editar",
    view: "Ver",
    search: "Buscar",
    filter: "Filtrar",
    close: "Cerrar",
    confirm: "Confirmar",
    back: "Volver",
    next: "Siguiente",
    previous: "Anterior",
    select: "Seleccionar",
    upload: "Subir",
    download: "Descargar",
    refresh: "Actualizar",
    clear: "Limpiar",
    reset: "Restablecer",
} as const;

// =====================================
// FEEDBACK GLOBAL
// (partes reutilizables de mensajes)
// =====================================
const feedback = {
    // Sufijos para componer mensajes
    createdSuccessSuffix: "creado exitosamente",
    createdErrorPrefix: "No se pudo crear",
    updatedSuccessSuffix: "actualizado exitosamente",
    updatedErrorPrefix: "No se pudo actualizar",
    deletedSuccessSuffix: "eliminado exitosamente",
    deletedErrorPrefix: "No se pudo eliminar",
    notFoundSuffix: "no encontrado",

    // Mensajes genéricos completos
    genericError: "Ha ocurrido un error",
    tryAgain: "Por favor, inténtalo de nuevo",
    loading: "Cargando...",
    saving: "Guardando...",
    deleting: "Eliminando...",
    processing: "Procesando...",
    success: "Operación exitosa",
    noChanges: "No hay cambios para guardar",
} as const;

// =====================================
// VALIDACIÓN GLOBAL
// =====================================
const validation = {
    required: "Este campo es requerido",
    invalidEmail: "El correo electrónico no es válido",
    invalidPhone: "El número de teléfono no es válido",
    invalidDate: "La fecha no es válida",
    invalidNumber: "El número no es válido",
    minLength: (min: number) => `Mínimo ${min} caracteres`,
    maxLength: (max: number) => `Máximo ${max} caracteres`,
    minValue: (min: number) => `El valor mínimo es ${min}`,
    maxValue: (max: number) => `El valor máximo es ${max}`,
    passwordMismatch: "Las contraseñas no coinciden",
    invalidFormat: "El formato no es válido",
} as const;

// =====================================
// DIÁLOGOS GLOBALES
// =====================================
const dialogs = {
    confirmDeleteTitle: "Confirmar eliminación",
    confirmActionTitle: "Confirmar acción",
    unsavedChanges: "Tienes cambios sin guardar. ¿Deseas continuar?",
    areYouSure: "¿Estás seguro?",
    cannotUndo: "Esta acción no se puede deshacer.",
} as const;

// =====================================
// TABLAS Y LISTAS GLOBALES
// =====================================
const tables = {
    noResults: "No se encontraron resultados",
    showingOf: (showing: number, total: number) =>
        `Mostrando ${showing} de ${total}`,
    itemsPerPage: "Elementos por página",
    page: "Página",
    of: "de",
    first: "Primera",
    last: "Última",
} as const;

// =====================================
// ESTADOS COMUNES
// =====================================
const status = {
    active: "Activo",
    inactive: "Inactivo",
    pending: "Pendiente",
    completed: "Completado",
    cancelled: "Cancelado",
    draft: "Borrador",
} as const;

// =====================================
// SUBSISTEMA DE VALIDACIONES DINÁMICAS
// Factory Pattern para generar validaciones gramaticalmente correctas
// =====================================
const validate = (field: string, gender: 'M' | 'F' = 'M') => {
    const article = gender === 'M' ? 'El' : 'La';
    const requiredSuffix = gender === 'M' ? 'obligatorio' : 'obligatoria';

    return {
        // Validaciones básicas (Getters para optimización)
        get required() { return `${article} ${field} es ${requiredSuffix}`; },
        get invalidEmail() { return `${article} ${field} no es un correo electrónico válido`; },
        get invalidPhone() { return `${article} ${field} no es un número de teléfono válido`; },
        get invalidDate() { return `${article} ${field} no es una fecha válida`; },
        get invalidNumber() { return `${article} ${field} no es un número válido`; },
        get passwordMismatch() { return `${article} ${field} no coincide`; },
        get invalidFormat() { return `El formato de ${field} no es válido`; },

        // Validaciones con parámetros
        minLength: (min: number) => `${article} ${field} debe tener al menos ${min} caracteres`,
        maxLength: (max: number) => `${article} ${field} no puede tener más de ${max} caracteres`,
        minValue: (min: number) => `${article} ${field} debe ser como mínimo ${min}`,
        maxValue: (max: number) => `${article} ${field} debe ser como máximo ${max}`,

        // Validación personalizada
        custom: (message: string) => message,
    };
};


// =====================================
// EXPORTACIÓN
// =====================================
export const sharedTexts = {
    actions,
    feedback,
    validation,
    validate, // Nueva factory de validaciones
    dialogs,
    tables,
    status,
} as const;
