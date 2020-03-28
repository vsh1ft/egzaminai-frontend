import { async, TestBed } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router'
import { routePaths } from '../../../router/app-routing.constant'
import { UserAuthenticationService } from '../../service/user-authentication/user-authentication.service'
import { Observable, of } from 'rxjs'
import { FormBuilder } from '@angular/forms'
import { delay } from 'rxjs/operators'
import { ChangePasswordComponent } from '../change-password.component'
import { ChangePasswordForm } from '../change-password-form'

describe(`${ChangePasswordComponent.name}`, () => {

    let component: ChangePasswordComponent
    let sessionSpy: SpyObj<UserAuthenticationService>
    let routeSpy: SpyObj<ActivatedRoute>
    let routerSpy: SpyObj<Router>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ChangePasswordComponent,
                {
                    provide: FormBuilder,
                    useValue: new FormBuilder()
                },
                {
                    provide: Router,
                    useValue: createSpyObj(Router.name, ['navigateByUrl'])
                },
                {
                    provide: ActivatedRoute,
                    useValue: createSpyObj(ActivatedRoute.name, ['queryParams'])
                },
                {
                    provide: UserAuthenticationService,
                    useValue: createSpyObj(UserAuthenticationService.name, ['changePassword'])
                }
            ]
        })
        routeSpy = TestBed.inject(ActivatedRoute) as SpyObj<ActivatedRoute>
        routeSpy.queryParams = of({token: 'test'})
        sessionSpy = TestBed.inject(UserAuthenticationService) as SpyObj<UserAuthenticationService>
        routerSpy = TestBed.inject(Router) as SpyObj<Router>
        component = TestBed.inject(ChangePasswordComponent)
    }))

    describe('Submit', () => {

        let authSpy: SpyObj<UserAuthenticationService>

        beforeEach(() => {
            authSpy = TestBed.inject(UserAuthenticationService) as SpyObj<UserAuthenticationService>
        })

        it('changes password', () => {
            component.passwordForm.controls.password.setValue('newPass')
            authSpy.changePassword.and.returnValue(of(undefined))

            component.submit()

            expect(authSpy.changePassword).toHaveBeenCalledWith(new ChangePasswordForm('test', 'newPass'))
        })

        it('navigates to login page', () => {
            authSpy.changePassword.and.returnValue(of(undefined))

            component.submit()

            expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(routePaths.login)
        })

        it('disables button on submit', () => {
            authSpy.changePassword.and.returnValue(of(undefined).pipe(delay(1)))

            component.submit()

            expect(component.isChangeEnabled).toBeFalsy()
        })

        it('enables sign up button after submit', () => {
            authSpy.changePassword.and.returnValue(of(undefined))

            component.submit()

            expect(component.isChangeEnabled).toBeTruthy()
        })
    })

})
