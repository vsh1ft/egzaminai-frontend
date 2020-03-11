import { ActivatedRouteSnapshot, Router} from '@angular/router'
import { TestBed } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import { AuthGuard } from './auth.guard'
import { SessionService } from '../../service/session/session.service'
import SpyObj = jasmine.SpyObj


describe(`${AuthGuard.name}`, () => {

    const routeStateStub = jasmine.createSpyObj('RouterStateSnapshot', [''])
    let sessionSpy: SpyObj<SessionService>
    let guard: AuthGuard

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard,
                {provide: SessionService, useValue: createSpyObj('SessionService', ['get'])},
                {provide: Router, useValue: createSpyObj('Router', ['navigate'])}
            ]
        })
        sessionSpy = TestBed.inject(SessionService) as SpyObj<SessionService>
        guard = TestBed.inject(AuthGuard)
    })

    it('activates route', () => {
        sessionSpy.get.and.returnValue('token')

        const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), routeStateStub)

        expect(canActivate).toBeTruthy()
    })

    it('doesn`t activate route', () => {
        sessionSpy.get.and.returnValue(null)

        const canActivate = guard.canActivate(new ActivatedRouteSnapshot(), routeStateStub)

        expect(canActivate).toBeFalsy()
    })

    it('reroutes to login when session is not found', () => {
        sessionSpy.get.and.returnValue(null)

        guard.canActivate(new ActivatedRouteSnapshot(), routeStateStub)

        expect((TestBed.inject(Router) as SpyObj<Router>).navigate).toHaveBeenCalledWith(['/login'])
    })

})
