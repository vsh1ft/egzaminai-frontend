import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import { LoginComponent } from '../login.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { LoginModule } from '../login.module'
import { SessionService } from '../../../service/session/session.service'
import { ActivatedRoute } from '@angular/router'
import { UserAuthenticationService } from '../../service/user-authentication/user-authentication.service'
import { of, throwError } from 'rxjs'
import SpyObj = jasmine.SpyObj
import { loginText } from '../login.constant'
import { routePaths } from '../../../router/app-routing.constant'
import { Location } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'
import { signUpText } from '../../sign-up/sign-up.constant'

describe(`${LoginComponent.name} template`, () => {

    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>
    let authSpy: SpyObj<UserAuthenticationService>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LoginModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([
                    {path: routePaths.signUp, component: DummyComponent},
                    {path: routePaths.login, component: DummyComponent},
                    {path: routePaths.forgotPassword, component: DummyComponent},
                    {path: routePaths.home, component: DummyComponent}
                ])
            ],
            providers: [
                {
                    provide: SessionService,
                    useValue: createSpyObj(SessionService.name, ['get'])
                },
                {provide: ActivatedRoute, useValue: createSpyObj('ActivatedRoute', [''])},
                {
                    provide: UserAuthenticationService,
                    useValue: createSpyObj(UserAuthenticationService.name, ['login', 'doesExist'])
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })

        authSpy = TestBed.inject(UserAuthenticationService) as SpyObj<UserAuthenticationService>
        fixture = TestBed.createComponent(LoginComponent)
        component = fixture.componentInstance
        component.ngOnInit()
        fixture.detectChanges()
    }))

    it('displays error when email is not set', () => {
        component.password.patchValue('password')
        authSpy.doesExist.and.returnValue(of(false))

        getElement('#sign-in').click()
        fixture.detectChanges()

        expect(getElement('mat-error').innerText).toEqual(loginText.emailRequired)
    })

    it('displays error when email is invalid', () => {
        component.email.patchValue('em')
        component.password.patchValue('password')
        authSpy.doesExist.and.returnValue(of(false))

        getElement('#sign-in').click()
        fixture.detectChanges()

        expect(getElement('mat-error').innerText).toEqual(signUpText.emailInvalid)
    })

    it('displays error when password is not set', () => {
        component.email.patchValue('email@email')
        authSpy.doesExist.and.returnValue(of(false))

        getElement('#sign-in').click()
        fixture.detectChanges()

        expect(getElements('mat-error')[1].innerText).toEqual(loginText.passwordRequired)
    })

    it('displays error when user is not found', () => {
        component.email.patchValue('email@email')
        authSpy.doesExist.and.returnValue(of(false))

        getElement('#sign-in').click()
        fixture.detectChanges()

        expect(getElements('mat-error')[0].innerText).toEqual(loginText.invalidUser)
    })

    it('displays error when password is incorrect', () => {
        component.email.patchValue('email@email')
        authSpy.doesExist.and.returnValue(of(true))
        authSpy.login.and.returnValue(throwError('err'))

        getElement('#sign-in').click()
        fixture.detectChanges()

        expect(getElements('mat-error')[0].innerText).toEqual(loginText.invalidUser)
    })

    describe(`Navigation`, () => {
        let location: Location

        beforeEach(() => {
            location = TestBed.inject(Location)
        })

        it('navigates to home page', fakeAsync(() => {

            authSpy.doesExist.and.returnValue(of(true))
            authSpy.login.and.returnValue(of(undefined))

            getElement('#sign-in').click()
            fixture.detectChanges()
            tick()

            expect(location.path()).toEqual('/' + routePaths.home)
        }))

        it('navigates to sign up page', fakeAsync(() => {
            authSpy.doesExist.and.returnValue(of(true))
            authSpy.login.and.returnValue(of(undefined))

            getElement('#sign-up').click()
            fixture.detectChanges()
            tick()

            expect(location.path()).toEqual('/' + routePaths.signUp)
        }))

        it('navigates to forgot password page', fakeAsync(() => {
            authSpy.doesExist.and.returnValue(of(true))
            authSpy.login.and.returnValue(of(undefined))

            getElement('#forgot-password').click()
            fixture.detectChanges()
            tick()

            expect(location.path()).toEqual('/' + routePaths.forgotPassword)
        }))

        it('navigates to login page on logo click', fakeAsync(() => {
            getElement('.logo').click()
            fixture.detectChanges()
            tick()

            expect(location.path()).toEqual('/' + routePaths.login)
        }))

    })

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    @Component({template: ''})
    class DummyComponent {
    }

})
