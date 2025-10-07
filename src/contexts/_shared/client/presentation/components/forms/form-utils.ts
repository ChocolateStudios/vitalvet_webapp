export const getFormDataObj = (form: HTMLFormElement): any => {
    try {
        return JSON.parse(form.dataset.formData!);
    }
    catch (e) {
        console.error('Something was wrong');
        return {};
    }
}