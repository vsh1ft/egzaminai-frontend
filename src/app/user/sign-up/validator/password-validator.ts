import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms'

export const passwordMatchValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.controls.password.value
    const repeatPassword = control.controls.repeatPassword.value
    if (password !== repeatPassword && repeatPassword.length > 0)
        control.controls.repeatPassword.setErrors({passwordMatch: true})
    else
        return null
}
