import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ActivatedRoute } from '@angular/router'
import { UserAuthenticationService } from '../../service/user-authentication/user-authentication.service'
import { of } from 'rxjs'
import SpyObj = jasmine.SpyObj
import { routePaths } from '../../../router/app-routing.constant'
import { Location } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'
import { ChangePasswordComponent } from '../change-password.component'
import { ChangePasswordModule } from '../change-password.module'
import { changePasswordText } from '../change-password.constant'

describe(`${ChangePasswordComponent.name} template`, () => {

    let component: ChangePasswordComponent
    let fixture: ComponentFixture<ChangePasswordComponent>
    let authSpy: SpyObj<UserAuthenticationService>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ChangePasswordModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([
                    {path: routePaths.login, component: DummyComponent},
                    {path: routePaths.home, component: DummyComponent}
                ])
            ],
            providers: [
                {provide: ActivatedRoute, useValue: createSpyObj('ActivatedRoute', [''])},
                {
                    provide: UserAuthenticationService,
                    useValue: createSpyObj(UserAuthenticationService.name, ['changePassword'])
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })

        authSpy = TestBed.inject(UserAuthenticationService) as SpyObj<UserAuthenticationService>
        fixture = TestBed.createComponent(ChangePasswordComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))
    describe(`Validation`, () => {

        describe(`Password`, () => {
            it('displays error when password is not set', () => {
                authSpy.changePassword.and.returnValue(of(undefined))

                getElement('#change-password').click()
                fixture.detectChanges()

                expect(getElements('mat-error')[0].innerText).toEqual(changePasswordText.passwordRequired)
            })

            it('displays error when password is too short', () => {
                component.passwordForm.controls.password.setValue('pas')
                authSpy.changePassword.and.returnValue(of(undefined))

                getElement('#change-password').click()
                fixture.detectChanges()

                expect(getElements('mat-error')[0].innerText).toEqual(changePasswordText.passwordLength)
            })
        })

        describe(`Repeat password`, () => {
            it('displays error when password is not set', () => {
                authSpy.changePassword.and.returnValue(of(undefined))

                getElement('#change-password').click()
                fixture.detectChanges()

                expect(getElements('mat-error')[1].innerText).toEqual(changePasswordText.passwordRequired)
            })

            it('displays error when passwords do not match', () => {
                component.passwordForm.controls.password.setValue('pas')
                component.passwordForm.controls.repeatPassword.setValue('pasw')
                authSpy.changePassword.and.returnValue(of(undefined))

                getElement('#change-password').click()
                fixture.detectChanges()

                expect(getElements('mat-error')[1].innerText).toEqual(changePasswordText.passwordsDoNotMatch)
            })
        })
    })

    describe(`Navigation`, () => {
        let location: Location

        beforeEach(() => {
            location = TestBed.inject(Location)
        })

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
