import { FormBuilder, FormGroup } from '@angular/forms'
import { passwordMatchValidator } from './password-validator'

describe('Password match validator', () => {
    let abstractControlSpy: jasmine.SpyObj<FormGroup>

    beforeEach(() => {
        abstractControlSpy = jasmine.createSpyObj('FormGroup', ['controls', 'setErrors'])
    })

    it('sets passwordMatch error', () => {
        const formGroup = new FormBuilder().group({
            password: ['password'],
            repeatPassword: ['repeatPassword']
        })
        passwordMatchValidator(formGroup)

        expect(formGroup.controls.repeatPassword.hasError('passwordMatch')).toBeTruthy()
    })

    it('doesn`t set passwordMatch error when match', () => {
        const formGroup = new FormBuilder().group({
            password: ['password'],
            repeatPassword: ['password']
        })
        passwordMatchValidator(formGroup)

        expect(formGroup.controls.repeatPassword.hasError('passwordMatch')).toBeFalsy()
    })

    it('doesn`t set passwordMatch error repeat password is empty', () => {
        const formGroup = new FormBuilder().group({
            password: ['password'],
            repeatPassword: ['']
        })
        passwordMatchValidator(formGroup)

        expect(formGroup.controls.repeatPassword.hasError('passwordMatch')).toBeFalsy()
    })

    it('returns null when passwords match', () => {
        const formGroup = new FormBuilder().group({
            password: ['password'],
            repeatPassword: ['password']
        })

        const actualResult = passwordMatchValidator(formGroup)

        expect(actualResult).toBeNull()
    })

})
