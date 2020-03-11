import { TestBed } from '@angular/core/testing'
import { UserAuthenticationService } from './user-authentication.service'
import { ObservableHttpService } from '../../../service/http-service/observable-http.service'
import { SessionService } from '../../../service/session/session.service'
import { Credentials } from '../../login/credentials'
import { of } from 'rxjs'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${UserAuthenticationService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: UserAuthenticationService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserAuthenticationService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['post'])
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

    it('sets session', done => {
        const creds = new Credentials('email', 'pswd')
        const token = 'token'
        httpServiceSpy.post.withArgs(`/user/authenticate`, creds).and.returnValue(of(token))

        service.login(creds)
            .subscribe(() => {
                expect(TestBed.inject(SessionService).set).toHaveBeenCalledWith(token)
                done()
            })
    })

    describe('Validation', () => {

        it('confirms that user is valid', done => {
            const creds = new Credentials('email', 'pswd')
            httpServiceSpy.post.withArgs(`/user/is-valid`, creds).and.returnValue(of(true))

            service.isValid(creds)
                .subscribe((isValid) => {
                    expect(isValid).toBeTruthy()
                    done()
                })
        })

        it('denies that user is valid', done => {
            const creds = new Credentials('email', 'pswd')
            httpServiceSpy.post.withArgs(`/user/is-valid`, creds).and.returnValue(of(false))

            service.isValid(creds)
                .subscribe((isValid) => {
                    expect(isValid).toBeFalsy()
                    done()
                })
        })
    })


})
