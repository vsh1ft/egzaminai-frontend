import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { UserAuthenticationService } from '../../service/user-authentication/user-authentication.service'
import { of } from 'rxjs'
import SpyObj = jasmine.SpyObj
import { routePaths } from '../../../router/app-routing.constant'
import { RouterTestingModule } from '@angular/router/testing'
import { ForgotPasswordComponent } from '../forgot-password.component'
import { SnackbarService } from '../../../service/snackbar/snackbar.service'
import { ForgotPasswordModule } from '../forgot-password.module'
import { forgotPasswordText } from '../forgot-password.constant'
import { Location } from '@angular/common'

describe(`${ForgotPasswordComponent.name} template`, () => {

    let component: ForgotPasswordComponent
    let fixture: ComponentFixture<ForgotPasswordComponent>
    let authSpy: SpyObj<UserAuthenticationService>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ForgotPasswordModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([
                    {path: routePaths.login, component: DummyComponent}
                ])
            ],
            providers: [
                {
                    provide: UserAuthenticationService,
                    useValue: createSpyObj(UserAuthenticationService.name, ['resetPassword'])
                },
                {
                    provide: SnackbarService,
                    useValue: createSpyObj(SnackbarService.name, ['showSuccess'])
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })

        authSpy = TestBed.inject(UserAuthenticationService) as SpyObj<UserAuthenticationService>
        fixture = TestBed.createComponent(ForgotPasswordComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))
    describe(`Validation`, () => {
        it('displays error when email is not set', () => {
            component.email.setValue('')
            authSpy.resetPassword.and.returnValue(of(undefined))

            getElement('#remind-password').click()
            fixture.detectChanges()

            expect(getElement('mat-error').innerText).toEqual(forgotPasswordText.emailRequired)
        })

        it('displays error when email is invalid', () => {
            component.email.setValue('email')
            authSpy.resetPassword.and.returnValue(of(undefined))

            getElement('#remind-password').click()
            fixture.detectChanges()

            expect(getElement('mat-error').innerText).toEqual(forgotPasswordText.emailInvalid)
        })
    })

    it('doesn`t reset password when form is invalid', () => {
        component.email.setValue('email')

        getElement('#remind-password').click()
        fixture.detectChanges()

        expect(authSpy.resetPassword).not.toHaveBeenCalled()
    })

    describe(`Navigation`, () => {
        it('navigates to login page on logo click', fakeAsync(() => {
            getElement('.logo').click()
            fixture.detectChanges()
            tick()

            expect(TestBed.inject(Location).path()).toEqual('/' + routePaths.login)
        }))
    })

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    @Component({template: ''})
    class DummyComponent {
    }

})
