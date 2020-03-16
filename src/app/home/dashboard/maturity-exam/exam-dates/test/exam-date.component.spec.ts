import { async, TestBed } from '@angular/core/testing'

import { ExamDateComponent } from '../exam-date.component'
import { ExamDateService } from '../service/exam-date.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { ExamDate } from '../exam-date'
import { of } from 'rxjs'

describe(`${ExamDateComponent.name}`, () => {
    let component: ExamDateComponent
    let serviceSpy: SpyObj<ExamDateService>
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ExamDateComponent,
                {
                    provide: ExamDateService,
                    useValue: createSpyObj(ExamDateService.name, ['getDates'])
                }
            ]
        })

        serviceSpy = TestBed.inject(ExamDateService) as SpyObj<ExamDateService>
        serviceSpy.getDates.and.returnValue(of([new ExamDate('name', 'VBE', 'date')]))
        component = TestBed.inject(ExamDateComponent)
    }))

    describe('Initialization', () => {
        it('retrieves dates', () => {
            component.ngOnInit()

            expect(component.dates).toBeDefined()
        })
    })

})
