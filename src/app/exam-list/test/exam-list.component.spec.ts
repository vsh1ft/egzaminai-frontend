import { async, TestBed } from '@angular/core/testing'

import { ExamListComponent } from '../exam-list.component'
import { ExamListService } from '../service/exam-list.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { Exam } from '../exam'
import { of } from 'rxjs'
import { ComponentRegistryService } from '../../service/registry/component-registry.service'


describe(`${ExamListComponent.name}`, () => {
    let component: ExamListComponent
    let serviceSpy: SpyObj<ExamListService>
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ExamListComponent,
                {
                    provide: ExamListService,
                    useValue: createSpyObj(ExamListService.name, ['getExams'])
                },
                {
                    provide: ComponentRegistryService,
                    useValue: createSpyObj(ComponentRegistryService.name, ['set'])
                }
            ]
        })

        serviceSpy = TestBed.inject(ExamListService) as SpyObj<ExamListService>
        serviceSpy.getExams.and.returnValue(of([new Exam('Fizika', 2014, 'VBE', 'someUrl', 'answUrl')]))
        component = TestBed.inject(ExamListComponent)
    }))

    describe('Initialization', () => {
        it('retrieves exams', () => {
            component.ngOnInit()

            expect(component.exams).toBeDefined()
        })

        it('registers component', () => {
            component.ngOnInit()

            expect((TestBed.inject(ComponentRegistryService) as SpyObj<ComponentRegistryService>).set)
                .toHaveBeenCalledWith('examList', ExamListComponent)
        })
    })

})
