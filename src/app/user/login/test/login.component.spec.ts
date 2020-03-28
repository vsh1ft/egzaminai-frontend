import { async, TestBed } from '@angular/core/testing'
import { LoginComponent } from '../login.component'
import createSpyObj = jasmine.createSpyObj
import { SessionService } from '../../../service/session/session.service'
import SpyObj = jasmine.SpyObj
import { Router } from '@angular/router'
import { routePaths } from '../../../router/app-routing.constant'
import { UserAuthenticationService } from '../../service/user-authentication/user-authentication.service'
import { of, throwError } from 'rxjs'
import { delay } from 'rxjs/operators'

describe(`${LoginComponent.name}`, () => {

    let component: LoginComponent
    let sessionSpy: SpyObj<SessionService>
    let routerSpy: SpyObj<Router>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [LoginComponent,
                {
                    provide: SessionService,
                    useValue: createSpyObj(SessionService.name, ['get'])
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
        component = TestBed.inject(LoginComponent)
    }))

    describe('Initialization', () => {
        it('reroutes to login page when session exists', () => {
            sessionSpy.get.and.returnValue('token')

            component.ngOnInit()

            expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(routePaths.home)
        })

        it('doesn`t reroute to login page when there is no user session', () => {
            sessionSpy.get.and.returnValue(null)

            component.ngOnInit()

            expect(routerSpy.navigateByUrl).not.toHaveBeenCalled()
        })
    })

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

                expect(component.email.hasError('invalidUser')).toBeFalsy()
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

                expect(component.email.hasError('invalidUser')).toBeTruthy()
            })

            it('sets validation error on wrong password', () => {
                authSpy.doesExist.and.returnValue(of(true))
                authSpy.login.and.returnValue(throwError('err'))

                component.submit()

                expect(component.email.hasError('invalidUser')).toBeTruthy()
            })
        })

        it('doesn`t set invalidUser error when form already has errors', () => {
            authSpy.doesExist.and.returnValue(of(true))
            component.email.setErrors({error: true})

            component.submit()

            expect(component.email.hasError('invalidUser')).toBeFalsy()
        })

        it('disables sign in button on submit', () => {
            authSpy.doesExist.and.returnValue(of(false).pipe(delay(1)))

            component.submit()

            expect(component.isSignInEnabled).toBeFalsy()
        })

        it('enables sign in button after submit', () => {
            sessionSpy.get.and.returnValue(null)

            component.ngOnInit()

            expect(component.isSignInEnabled).toBeTruthy()
        })
    })

})
