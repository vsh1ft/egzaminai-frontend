import { async, TestBed } from '@angular/core/testing'

import { ExamDateComponent } from '../exam-date.component'
import { ExamDateService } from '../service/exam-date.service'
import { ExamDate } from '../exam-date'
import { of } from 'rxjs'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

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
        serviceSpy.getDates.and.returnValue(of([new ExamDate(MaturityExam.ENGLISH_LANGUAGE, ExamType.SCHOOL_LEVEL, 'date')]))
        component = TestBed.inject(ExamDateComponent)
    }))

    describe('Initialization', () => {
        it('retrieves dates', () => {
            component.ngOnInit()

            expect(component.dates).toBeDefined()
        })
    })

})
