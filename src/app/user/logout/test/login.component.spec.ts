import { async, TestBed } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import { SessionService } from '../../../service/session/session.service'
import SpyObj = jasmine.SpyObj
import { ActivatedRoute, Router } from '@angular/router'
import { LogoutComponent } from '../logout.component'
import { ObservableHttpService } from '../../../service/http-service/observable-http.service'
import { of } from 'rxjs'
import { routePaths } from '../../../router/app-routing.constant'

describe(`${LogoutComponent.name}`, () => {

    let component: LogoutComponent
    let sessionSpy: SpyObj<SessionService>
    let routerSpy: SpyObj<Router>
    let httpServiceSpy: SpyObj<ObservableHttpService>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [LogoutComponent,
                {
                    provide: SessionService,
                    useValue: createSpyObj(SessionService.name, ['clear'])
                },
                {
                    provide: Router,
                    useValue: createSpyObj(Router.name, ['navigateByUrl'])
                },
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['post'])
                }
            ]
        })
        sessionSpy = TestBed.inject(SessionService) as SpyObj<SessionService>
        routerSpy = TestBed.inject(Router) as SpyObj<Router>
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        component = TestBed.inject(LogoutComponent)
    }))

    it('cleans session after logout', () => {
        httpServiceSpy.post.and.returnValue(of(undefined))

        component.logout()

        expect(sessionSpy.clear).toHaveBeenCalled()
    })


    it('redirects to login after logout', () => {
        httpServiceSpy.post.and.returnValue(of(undefined))

        component.logout()

        expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(routePaths.login)
    })


})
