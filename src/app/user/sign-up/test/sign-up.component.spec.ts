import { async, TestBed } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import { SessionService } from '../../../service/session/session.service'
import SpyObj = jasmine.SpyObj
import { Router } from '@angular/router'
import { routePaths } from '../../../router/app-routing.constant'
import { UserAuthenticationService } from '../../service/user-authentication/user-authentication.service'
import { of } from 'rxjs'
import { SignUpComponent } from '../sign-up.component'
import { FormBuilder } from '@angular/forms'

describe(`${SignUpComponent.name}`, () => {

    let component: SignUpComponent
    let sessionSpy: SpyObj<SessionService>
    let routerSpy: SpyObj<Router>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [SignUpComponent,
                {
                    provide: FormBuilder,
                    useValue: new FormBuilder()
                },
                {
                    provide: Router,
                    useValue: createSpyObj(Router.name, ['navigateByUrl'])
                },
                {
                    provide: UserAuthenticationService,
                    useValue: createSpyObj(UserAuthenticationService.name, ['login', 'doesExist'])
                }
            ]
        })
        sessionSpy = TestBed.inject(SessionService) as SpyObj<SessionService>
        routerSpy = TestBed.inject(Router) as SpyObj<Router>
        component = TestBed.inject(SignUpComponent)
    }))

    describe('Submit', () => {

        let authSpy: SpyObj<UserAuthenticationService>

        beforeEach(() => {
            authSpy = TestBed.inject(UserAuthenticationService) as SpyObj<UserAuthenticationService>
        })

        describe('Success', () => {
            it('navigates to home page', () => {
                authSpy.doesExist.and.returnValue(of(true))
                authSpy.login.and.returnValue(of(undefined))

                component.submit()

                expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(routePaths.home)
            })

            it('doesn`t set validation error after success', () => {
                authSpy.doesExist.and.returnValue(of(true))

                component.submit()

                expect(component.userForm.controls.email.hasError('emailTaken')).toBeFalsy()
            })

        })

        describe('Failure', () => {
            it('doesn`t navigate to home page', () => {
                authSpy.doesExist.and.returnValue(of(false))

                component.submit()

                expect(routerSpy.navigateByUrl).not.toHaveBeenCalledWith(routePaths.home)
            })

            it('sets validation error', () => {
                authSpy.doesExist.and.returnValue(of(false))

                component.submit()

                expect(component.userForm.controls.email.hasError('emailTaken')).toBeTruthy()
            })
        })

        it('doesn`t set invalidUser error when form already has errors', () => {
            authSpy.doesExist.and.returnValue(of(true))
            component.userForm.controls.email.setErrors({error: true})

            component.submit()

            expect(component.userForm.controls.email.hasError('emailTaken')).toBeFalsy()
        })

        it('disables sign up button on submit', () => {
            authSpy.doesExist.and.returnValue(of(false))

            component.submit()

            expect(component.isSignUpDisabled).toBeFalsy()
        })

        it('enables sign up button after submit', () => {
            sessionSpy.get.and.returnValue(null)

            component.ngOnInit()

            expect(routerSpy.navigateByUrl).not.toHaveBeenCalled()
        })
    })

})
