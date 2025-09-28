export class FormStateManager {
    private form: HTMLFormElement;
    private submitButton: HTMLButtonElement;
    private initialState: Record<string, any>;
    private currentState: Record<string, any>;

    constructor(form: HTMLFormElement, submitButton: HTMLButtonElement) {
        this.form = form;
        this.submitButton = submitButton;
        this.initialState = this.getFormData();
        this.currentState = { ...this.initialState };

        // El botón empieza deshabilitado en modo edición.
        this.submitButton.disabled = true;
    }

    private getFormData(): Record<string, any> {
        const formData = new FormData(this.form);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        return data;
    }

    private handleInput(event: CustomEvent) {
        const { name, value } = event.detail;
        if (name) {
            this.currentState[name] = value;
        }
        this.checkState();
    }

    private checkState() {
        const isDirty = JSON.stringify(this.initialState) !== JSON.stringify(this.currentState);
        this.submitButton.disabled = !isDirty;
    }

    public initialize() {
        this.form.addEventListener('form:input', (e) => this.handleInput(e as CustomEvent));
    }
}