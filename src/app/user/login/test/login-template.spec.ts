import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import { LoginComponent } from '../login.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { LoginModule } from '../login.module'
import { SessionService } from '../../../service/session/session.service'
import { Router } from '@angular/router'
import { UserAuthenticationService } from '../../service/user-authentication/user-authentication.service'
import { of } from 'rxjs'
import SpyObj = jasmine.SpyObj
import { loginText } from '../login.constant'
import { routePaths } from '../../../router/app-routing.constant'

describe(`${LoginComponent.name} template`, () => {

    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>
    let authSpy: SpyObj<UserAuthenticationService>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LoginModule,
                NoopAnimationsModule
            ],
            providers: [
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
                    useValue: createSpyObj(UserAuthenticationService.name, ['login', 'isValid'])
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
        authSpy.isValid.and.returnValue(of(false))

        getElement('#sign-in').click()
        fixture.detectChanges()

        expect(getElement('mat-error').innerText).toEqual(loginText.emailRequired)
    })

    it('displays error when password is not set', () => {
        component.email.patchValue('email@email')
        authSpy.isValid.and.returnValue(of(false))

        getElement('#sign-in').click()
        fixture.detectChanges()

        expect(getElements('mat-error')[1].innerText).toEqual(loginText.passwordRequired)
    })

    it('displays error when user is not found', () => {
        component.email.patchValue('email@email')
        authSpy.isValid.and.returnValue(of(false))

        getElement('#sign-in').click()
        fixture.detectChanges()

        expect(getElements('mat-error')[0].innerText).toEqual(loginText.invalidUser)
    })

    it('navigates to home page on success', () => {
        authSpy.isValid.and.returnValue(of(true))
        authSpy.login.and.returnValue(of(undefined))

        getElement('#sign-in').click()
        fixture.detectChanges()

        expect((TestBed.inject(Router) as SpyObj<Router>).navigateByUrl).toHaveBeenCalledWith(routePaths.home)
    })

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

})
