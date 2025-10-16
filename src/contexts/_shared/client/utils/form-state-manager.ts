/**
 * Gestiona el estado de un formulario para determinar si algún campo ha cambiado.
 * Su propósito principal es comparar el estado inicial del formulario con su estado actual
 * para notificar a otros componentes si hay cambios.
 * Esto es útil en los formularios de "edición" para evitar que los usuarios envíen datos sin haber realizado ninguna modificación.
 */
export class FormStateManager {
    private form: HTMLFormElement;
    // Almacena los valores del formulario cuando se inicializa la clase.
    private initialState: Record<string, any>;
    // Almacena los valores actuales del formulario a medida que el usuario interactúa.
    private currentState: Record<string, any>;

    constructor(form: HTMLFormElement) {
        this.form = form;
        
        // Captura el estado inicial del formulario al momento de la creación.
        this.initialState = this.getFormData();
        this.currentState = { ...this.initialState };
    }

    /**
     * Extrae los datos del formulario y los devuelve como un objeto.
     */
    private getFormData(): Record<string, any> {
        const formData = new FormData(this.form);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }

    /**
     * Se ejecuta cada vez que un campo del formulario cambia, actualizando el estado actual.
     */
    private handleInput(event: CustomEvent) {
        const { name, value } = event.detail;
        if (name) {
            this.currentState[name] = value;
        }
        this.dispatchDirtyState();
    }

    /**
     * Lanza un evento con el estado "dirty" actual del formulario.
     */
    private dispatchDirtyState() {
        this.form.dispatchEvent(new CustomEvent('form:dirty-state-change', {
            bubbles: true,
            composed: true,
            detail: { isDirty: this.isDirty() }
        }));
    }

    /**
     * Compara el estado inicial y actual para determinar si el formulario ha cambiado.
     * @returns {boolean} - `true` si el formulario tiene cambios, `false` en caso contrario.
     */
    public isDirty(): boolean {
        return JSON.stringify(this.initialState) !== JSON.stringify(this.currentState);
    }

    /**
     * Inicializa el gestor, añadiendo el listener para detectar cambios en los inputs.
     */
    public initialize() {
        this.form.addEventListener('form:input', (e) => this.handleInput(e as CustomEvent));
    }
}
