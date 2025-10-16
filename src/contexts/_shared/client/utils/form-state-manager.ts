/**
 * Gestiona el estado de un formulario para determinar si algún campo ha cambiado.
 * Su propósito principal es comparar el estado inicial del formulario con su estado actual
 * y habilitar o deshabilitar un botón de envío (actualizar) basado en si hay cambios.
 * Esto es útil en los formularios de "edición" para evitar que los usuarios envíen datos sin haber realizado ninguna modificación.
 */
export class FormStateManager {
    private form: HTMLFormElement;
    private submitButton: HTMLButtonElement;
    // Almacena los valores del formulario cuando se inicializa la clase.
    private initialState: Record<string, any>;
    // Almacena los valores actuales del formulario a medida que el usuario interactúa.
    private currentState: Record<string, any>;

    constructor(form: HTMLFormElement, submitButton: HTMLButtonElement) {
        this.form = form;
        this.submitButton = submitButton;
        
        // Captura el estado inicial del formulario al momento de la creación.
        this.initialState = this.getFormData();
        this.currentState = { ...this.initialState };

        // El botón de "actualizar" comienza deshabilitado, ya que no hay cambios.
        this.submitButton.disabled = true;
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
        this.checkState();
    }

    /**
     * Compara el estado inicial y actual del formulario.
     * Si los estados son diferentes (el formulario está "sucio"), el botón de envío se habilita.
     * Si los estados son iguales, el botón se deshabilita.
     */
    private checkState() {
        const isDirty = this.isDirty();
        this.submitButton.disabled = !isDirty;
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
