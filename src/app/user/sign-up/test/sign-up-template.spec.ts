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
import { SignUpComponent } from '../sign-up.component'
import { SignUpModule } from '../sign-up.module'
import { signUpText } from '../sign-up.constant'

describe(`${SignUpComponent.name} template`, () => {

    let component: SignUpComponent
    let fixture: ComponentFixture<SignUpComponent>
    let authSpy: SpyObj<UserAuthenticationService>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SignUpModule,
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
                    useValue: createSpyObj(UserAuthenticationService.name, ['create', 'doesExist'])
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })

        authSpy = TestBed.inject(UserAuthenticationService) as SpyObj<UserAuthenticationService>
        fixture = TestBed.createComponent(SignUpComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))
    describe(`Validation`, () => {
        describe(`Email`, () => {
            it('displays error when email is not set', () => {
                component.userForm.controls.passwordForm.get('password').setValue('pass')
                component.userForm.controls.passwordForm.get('repeatPassword').setValue('pass')
                authSpy.doesExist.and.returnValue(of(false))

                getElement('#sign-up').click()
                fixture.detectChanges()

                expect(getElement('mat-error').innerText).toEqual(signUpText.emailRequired)
            })

            it('displays error when email is invalid', () => {
                component.userForm.controls.email.patchValue('email')
                authSpy.doesExist.and.returnValue(of(false))

                getElement('#sign-up').click()
                fixture.detectChanges()

                expect(getElement('mat-error').innerText).toEqual(signUpText.emailInvalid)
            })

            it('displays error when email is already taken', () => {
                component.userForm.controls.email.patchValue('email@email')
                component.userForm.controls.passwordForm.get('password').setValue('password')
                component.userForm.controls.passwordForm.get('repeatPassword').setValue('password')
                authSpy.doesExist.and.returnValue(of(false))

                getElement('#sign-up').click()
                fixture.detectChanges()

                expect(getElements('mat-error')[0].innerText).toEqual(signUpText.emailTaken)
            })
        })

        describe(`Password`, () => {
            it('displays error when password is not set', () => {
                component.userForm.controls.email.patchValue('email@e')
                authSpy.doesExist.and.returnValue(of(false))

                getElement('#sign-up').click()
                fixture.detectChanges()

                expect(getElements('mat-error')[0].innerText).toEqual(signUpText.passwordRequired)
            })

            it('displays error when password is too short', () => {
                component.userForm.controls.email.patchValue('email@e')
                component.userForm.controls.passwordForm.get('password').setValue('pas')
                authSpy.doesExist.and.returnValue(of(false))

                getElement('#sign-up').click()
                fixture.detectChanges()

                expect(getElements('mat-error')[0].innerText).toEqual(signUpText.passwordLength)
            })
        })

        describe(`Repeat password`, () => {
            it('displays error when password is not set', () => {
                component.userForm.controls.email.patchValue('email@e')
                authSpy.doesExist.and.returnValue(of(false))

                getElement('#sign-up').click()
                fixture.detectChanges()

                expect(getElements('mat-error')[1].innerText).toEqual(signUpText.passwordRequired)
            })

            it('displays error when passwords do not match', () => {
                component.userForm.controls.email.patchValue('email@ea')
                component.userForm.controls.passwordForm.get('password').setValue('pas')
                component.userForm.controls.passwordForm.get('repeatPassword').setValue('pasw')
                authSpy.doesExist.and.returnValue(of(false))

                getElement('#sign-up').click()
                fixture.detectChanges()

                expect(getElements('mat-error')[1].innerText).toEqual(signUpText.passwordsDoNotMatch)
            })
        })
    })

    it('doesn`t check if email is taken when form is invalid', () => {
        component.userForm.controls.email.patchValue('email@email')

        getElement('#sign-up').click()
        fixture.detectChanges()

        expect(authSpy.doesExist).not.toHaveBeenCalled()
    })

    describe(`Navigation`, () => {
        let location: Location

        beforeEach(() => {
            location = TestBed.inject(Location)
        })

        it('navigates to home page', fakeAsync(() => {
            authSpy.doesExist.and.returnValue(of(true))
            authSpy.create.and.returnValue(of(undefined))
            component.userForm.controls.email.patchValue('email@email')
            component.userForm.controls.passwordForm.get('password').setValue('password')
            component.userForm.controls.passwordForm.get('repeatPassword').setValue('password')

            getElement('#sign-up').click()
            fixture.detectChanges()
            tick()

            expect(location.path()).toEqual('/' + routePaths.home)
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
