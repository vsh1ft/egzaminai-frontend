import { async, TestBed } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { UserAuthenticationService } from '../../service/user-authentication/user-authentication.service'
import { of } from 'rxjs'
import { delay } from 'rxjs/operators'
import { ForgotPasswordComponent } from '../forgot-password.component'
import { SnackbarService } from '../../../service/snackbar/snackbar.service'
import { forgotPasswordText } from '../forgot-password.constant'

describe(`${ForgotPasswordComponent.name}`, () => {

    let component: ForgotPasswordComponent
    let snackbarSpy: SpyObj<SnackbarService>
    let authSpy: SpyObj<UserAuthenticationService>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ForgotPasswordComponent,
                {
                    provide: UserAuthenticationService,
                    useValue: createSpyObj(UserAuthenticationService.name, ['resetPassword'])
                },
                {
                    provide: SnackbarService,
                    useValue: createSpyObj(SnackbarService.name, ['showSuccess'])
                }
            ]
        })
        authSpy = TestBed.inject(UserAuthenticationService) as SpyObj<UserAuthenticationService>
        snackbarSpy = TestBed.inject(SnackbarService) as SpyObj<SnackbarService>
        component = TestBed.inject(ForgotPasswordComponent)
    }))

    describe('Submit', () => {

        it('displays success snackbar', () => {
            component.email.setValue('email')
            authSpy.resetPassword.and.returnValue(of(undefined))

            component.submit()

            expect(snackbarSpy.showSuccess).toHaveBeenCalledWith(forgotPasswordText.checkEmail)
        })

        it('doesn`t set validation error after success', () => {
            authSpy.resetPassword.and.returnValue(of(undefined))

            component.submit()

            expect(component.email.errors).toBeNull()
        })

        it('disables sign up button on submit', () => {
            authSpy.resetPassword.and.returnValue(of(undefined).pipe(delay(1)))

            component.submit()

            expect(component.isResetEnabled).toBeFalsy()
        })

        it('enables sign up button after submit', () => {
            authSpy.resetPassword.and.returnValue(of(undefined))

            component.submit()

            expect(component.isResetEnabled).toBeTruthy()
        })
    })

})
