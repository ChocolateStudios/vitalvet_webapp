export const getFormDataObj = (form: HTMLFormElement): any => {
    try {
        return JSON.parse(form.dataset.formData!);
    }
    catch (e) {
        console.error('Something was wrong');
        return {};
    }
}

export const showError = (input: HTMLInputElement, message: string) => {
    const isHiddenValueInput = input.id.endsWith('-value');
    const baseId = isHiddenValueInput ? input.id.slice(0, -6) : input.id;
    const errorContainer = document.getElementById(`${baseId}-error-container`);
    if (errorContainer) {
        errorContainer.textContent = message;
    }
    // Aplica estilos al input visible, no al oculto.
    const visibleInput = isHiddenValueInput ? document.getElementById(baseId) as HTMLInputElement : input;
    if (visibleInput) {
        visibleInput.classList.remove('outline-gray-300', 'focus:outline-blue-800');
        visibleInput.classList.add('outline-red-500', 'focus:outline-red-500');
    }
}

export const clearError = (input: HTMLInputElement) => {
    const isHiddenValueInput = input.id.endsWith('-value');
    const baseId = isHiddenValueInput ? input.id.slice(0, -6) : input.id;
    const errorContainer = document.getElementById(`${baseId}-error-container`);
    if (errorContainer) {
        errorContainer.textContent = '';
    }
    // Restaura estilos en el input visible.
    const visibleInput = isHiddenValueInput ? document.getElementById(baseId) as HTMLInputElement : input;
    if (visibleInput) {
        visibleInput.classList.remove('outline-red-500', 'focus:outline-red-500');
        visibleInput.classList.add('outline-gray-300', 'focus:outline-blue-800');
    }
}