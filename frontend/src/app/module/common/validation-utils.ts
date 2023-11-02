import {FormGroup} from '@angular/forms';

export default class ValidationUtils {
    static isRequiredError = (form: FormGroup, field: string) => form.get(field).hasError('required');

    static isNumberMinError = (form: FormGroup, field: string) =>
        form.get(field).hasError('min') && !form.get(field).hasError('required')

    static isNumberMaxError = (form: FormGroup, field: string) =>
        form.get(field).hasError('max') &&
        !form.get(field).hasError('min') &&
        !form.get(field).hasError('required')

    static isTextMaxError = (form: FormGroup, field: string) =>
        form.get(field).hasError('maxLength') && !form.get(field).hasError('required')

    static requiredErrorMessage = () => 'This is required';

    static numberMinErrorMessage = (min: number) => `Must be at least ${min}`;

    static numberMaxErrorMessage = (max: number) => `Must be at most ${max}`;

    static textMaxErrorMessage = (maxLength: number) => `Must not exceed ${maxLength} characters`;
}
