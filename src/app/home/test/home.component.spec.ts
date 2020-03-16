import { async, TestBed } from '@angular/core/testing'

import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { HomeComponent } from '../home.component'
import { ComponentFactoryResolver } from '@angular/core'
import { ComponentRegistryService } from '../../service/registry/component-registry.service'
import { ExamListComponent } from '../../exam-list/exam-list.component'
import { ViewContainerWrapper } from '../view-container-wrapper.directive'

describe(`${HomeComponent.name}`, () => {
    let component: HomeComponent
    let componentFactorySpy: SpyObj<ComponentFactoryResolver>
    let componentRegistrySpy: SpyObj<ComponentRegistryService>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [HomeComponent,
                {
                    provide: ComponentFactoryResolver,
                    useValue: createSpyObj(ComponentFactoryResolver.name, ['resolveComponentFactory'])
                },
                {
                    provide: ComponentRegistryService,
                    useValue: createSpyObj(ComponentRegistryService.name, ['get'])
                }
            ]
        }).compileComponents()

        componentFactorySpy = TestBed.inject(ComponentFactoryResolver) as SpyObj<ComponentFactoryResolver>
        componentRegistrySpy = TestBed.inject(ComponentRegistryService) as SpyObj<ComponentRegistryService>
        component = TestBed.inject(HomeComponent)
    }))

    describe('Initialization', () => {
        it('sets default component as ExamList', () => {
            const componentFactoryDummy = createSpyObj('ComponentFactory', [''])
            const viewContainerSpy = createSpyObj('ViewContainerRef', ['createComponent'])
            componentFactorySpy.resolveComponentFactory.withArgs(ExamListComponent).and.returnValue(componentFactoryDummy)
            component.wrapper = new ViewContainerWrapper(viewContainerSpy)

            component.ngOnInit()

            expect(viewContainerSpy.createComponent).toHaveBeenCalledWith(componentFactoryDummy)
        })

    })

    it('swaps component', () => {
        componentRegistrySpy.get.withArgs('someComponent').and.returnValue(ExamListComponent)
        const componentFactoryDummy = createSpyObj('ComponentFactory', [''])
        const viewContainerSpy = createSpyObj('ViewContainerRef', ['clear', 'createComponent'])
        componentFactorySpy.resolveComponentFactory.withArgs(ExamListComponent).and.returnValue(componentFactoryDummy)
        component.wrapper = new ViewContainerWrapper(viewContainerSpy)

        component.swapComponent('someComponent')

        expect(viewContainerSpy.clear).toHaveBeenCalled()
        expect(viewContainerSpy.createComponent).toHaveBeenCalledWith(componentFactoryDummy)
    })

})
