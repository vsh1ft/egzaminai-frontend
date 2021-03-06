import { Component, ComponentFactoryResolver, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { HomeComponent } from '../home.component'
import { HomeModule } from '../home.module'
import { ComponentRegistryService } from '../../service/registry/component-registry.service'
import { of } from 'rxjs'
import { Router } from '@angular/router'
import { LogoutComponent } from '../../user/logout/logout.component'
import { RouterTestingModule } from '@angular/router/testing'
import { ObservableHttpService } from '../../service/http-service/observable-http.service'
import { SessionService } from '../../service/session/session.service'
import { CrudService } from '../../service/crud/crud.service'

describe(`${HomeComponent.name} template`, () => {

    let component: HomeComponent
    let componentRegistrySpy: SpyObj<ComponentRegistryService>
    let fixture: ComponentFixture<HomeComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                HomeModule,
                NoopAnimationsModule, RouterTestingModule
            ],
            providers: [HomeComponent, ComponentRegistryService,
                {provide: ObservableHttpService, useValue: null},
                {provide: SessionService, useValue: null},
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll'])
                },
                {
                    provide: ComponentRegistryService,
                    useValue: createSpyObj(ComponentRegistryService.name, ['get', 'set'])
                }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        componentRegistrySpy = TestBed.inject(ComponentRegistryService) as SpyObj<ComponentRegistryService>
        component = TestBed.inject(HomeComponent);
        (TestBed.inject(CrudService) as SpyObj<CrudService>).retrieveAll.and.returnValue(of(undefined))
        fixture = TestBed.createComponent(HomeComponent)
        component = fixture.componentInstance
        component.ngOnInit()
        fixture.detectChanges()
    })

    it('initializes component', async () => {
        expect(getElement('exam-list')).toBeDefined()
        expect(getElement('logout')).toBeDefined()
    })


    it('swaps component', async () => {
        componentRegistrySpy.get.withArgs('someComponent').and.returnValue(DummyComponent)

        component.swapComponent('someComponent')

        expect(getElement('dummy')).toBeDefined()
    })

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    @Component({selector: 'dummy', template: 'exam-template'})
    class DummyComponent {
    }

})
