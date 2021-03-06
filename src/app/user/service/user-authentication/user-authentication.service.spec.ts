import { TestBed } from '@angular/core/testing'
import { UserAuthenticationService } from './user-authentication.service'
import { ObservableHttpService } from '../../../service/http-service/observable-http.service'
import { SessionService } from '../../../service/session/session.service'
import { Credentials } from '../../login/credentials'
import { of } from 'rxjs'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { ChangePasswordForm } from '../../change-password/change-password-form'

describe(`${UserAuthenticationService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: UserAuthenticationService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserAuthenticationService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['post', 'get'])
                },
                {
                    provide: SessionService,
                    useValue: createSpyObj(SessionService.name, ['set'])
                }
            ]
        })
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        service = TestBed.inject(UserAuthenticationService)
    })

    it('logins and sets session', done => {
        const creds = new Credentials('email', 'pswd')
        const token = 'token'
        httpServiceSpy.post.withArgs(`/user/login`, creds).and.returnValue(of(token))

        service.login(creds)
            .subscribe(() => {
                expect(TestBed.inject(SessionService).set).toHaveBeenCalledWith(token)
                done()
            })
    })

    it('creates user and sets session', done => {
        const creds = new Credentials('email', 'pswd')
        const token = 'token'
        httpServiceSpy.post.withArgs(`/user/create`, creds).and.returnValue(of(token))

        service.create(creds)
            .subscribe(() => {
                expect(TestBed.inject(SessionService).set).toHaveBeenCalledWith(token)
                done()
            })
    })

    it('resets password', done => {
        const email = 'email'
        httpServiceSpy.post.withArgs(`/user/reset-password`, email).and.returnValue(of())

        service.resetPassword(email)
        done()

        expect(httpServiceSpy.post).toHaveBeenCalled()
    })

    it('changes password', done => {
        const form = new ChangePasswordForm('token', 'pass')
        httpServiceSpy.post.withArgs(`/user/change-password`, form).and.returnValue(of())

        service.changePassword(form)
        done()

        expect(httpServiceSpy.post).toHaveBeenCalled()
    })

    describe('Validation', () => {

        it('confirms that user is valid', done => {
            httpServiceSpy.get.withArgs(`/user/exist/email`).and.returnValue(of(true))

            service.doesExist('email')
                .subscribe((isValid) => {
                    expect(isValid).toBeTruthy()
                    done()
                })
        })

        it('denies that user is valid', done => {
            httpServiceSpy.get.withArgs(`/user/exist/email`).and.returnValue(of(false))

            service.doesExist('email')
                .subscribe((isValid) => {
                    expect(isValid).toBeFalsy()
                    done()
                })
        })
    })


})
