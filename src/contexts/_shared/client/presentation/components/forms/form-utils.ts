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

export const validateRulesPerField = (rules: any, data: any) => {
    const errors: any = {};
    for (const fieldName in rules) {
        for (const rule of rules[fieldName]) {
            const value = data[fieldName];
            if (!rule.validate(value)) {
                errors[fieldName] = rule.message;
                break; // Para en el primer error de un campo
            }
        }
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

export const collectValidationRulesAndDeleteFromDOM = (form: HTMLFormElement): any => {
    const rules: any = {};
    const inputs = form.querySelectorAll('[data-validations]');

    inputs.forEach(input => {
        const inputElement = input as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement);
        const fieldName = inputElement.name;
        const validationsAttr = inputElement.dataset.validations;

        if (fieldName && validationsAttr && validationsAttr.length > 2) { // > 2 because it's a JSON array '[]'
            try {
                const validations = JSON.parse(validationsAttr);
                if (Array.isArray(validations)) {
                    rules[fieldName] = validations.map(rule => {
                        if (rule.validate && typeof rule.validate === 'string') {
                            const funcStr = rule.validate;
                            try {
                                const arrowIndex = funcStr.indexOf('=>');
                                if (arrowIndex > -1) {
                                    let params = funcStr.substring(0, arrowIndex).trim();
                                    if (params.startsWith('(') && params.endsWith(')')) {
                                        params = params.slice(1, -1);
                                    }
                                    const paramName = params.split(':')[0].trim();
                                    const body = funcStr.substring(arrowIndex + 2).trim();
                                    rule.validate = new Function(paramName, `return ${body}`);
                                }
                            } catch (e) {
                                console.error(`Error creating function from string for field "${fieldName}":`, e);
                            }
                        }
                        return rule;
                    });
                }
            } catch (e) {
                console.error(`Error parsing validations for field "${fieldName}":`, e);
            }
            
            // Remove the attribute from the DOM
            inputElement.removeAttribute('data-validations');
        }
    });

    return rules;
}