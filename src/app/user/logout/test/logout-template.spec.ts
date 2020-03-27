import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing'
import createSpyObj = jasmine.createSpyObj
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { SessionService } from '../../../service/session/session.service'
import { ActivatedRoute, Router } from '@angular/router'
import { of } from 'rxjs'
import SpyObj = jasmine.SpyObj
import { routePaths } from '../../../router/app-routing.constant'
import { Location } from '@angular/common'
import { RouterTestingModule } from '@angular/router/testing'
import { LogoutComponent } from '../logout.component'
import { LogoutModule } from '../logout.module'
import { ObservableHttpService } from '../../../service/http-service/observable-http.service'

describe(`${LogoutComponent.name} template`, () => {

    let component: LogoutComponent
    let fixture: ComponentFixture<LogoutComponent>
    let sessionSpy: SpyObj<SessionService>
    let httpServiceSpy: SpyObj<ObservableHttpService>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LogoutModule,
                NoopAnimationsModule,
                RouterTestingModule.withRoutes([
                    {path: routePaths.login, component: DummyComponent}
                ])
            ],
            providers: [
                {
                    provide: SessionService,
                    useValue: createSpyObj(SessionService.name, ['clear'])
                },
                {provide: ActivatedRoute, useValue: createSpyObj('ActivatedRoute', [''])},
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['post'])
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })

        sessionSpy = TestBed.inject(SessionService) as SpyObj<SessionService>
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        fixture = TestBed.createComponent(LogoutComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    }))


    describe(`Navigation`, () => {
        let location: Location

        beforeEach(() => {
            location = TestBed.inject(Location)
        })

        it('navigates to login page', fakeAsync(() => {

            httpServiceSpy.post.and.returnValue(of(undefined))

            getElement('#logout-button').click()
            fixture.detectChanges()
            tick()

            expect(location.path()).toEqual('/' + routePaths.login)
        }))

    })

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    @Component({template: ''})
    class DummyComponent {
    }

})
