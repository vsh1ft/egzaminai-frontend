import { async, TestBed } from '@angular/core/testing'

import { ExamListComponent } from '../exam-list.component'
import { ExamListService } from '../service/exam-list.service'
import { Exam } from '../type/exam'
import { of } from 'rxjs'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../../exam-dates/exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${ExamListComponent.name}`, () => {
    let component: ExamListComponent
    let serviceSpy: SpyObj<ExamListService>
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ExamListComponent,
                {
                    provide: ExamListService,
                    useValue: createSpyObj(ExamListService.name, ['getExams'])
                }
            ]
        })

        serviceSpy = TestBed.inject(ExamListService) as SpyObj<ExamListService>
        serviceSpy.getExams.and.returnValue(of([new Exam(MaturityExam.PHYSICS, 2014, ExamType.SCHOOL_LEVEL, 'someUrl', 'answUrl')]))
        component = TestBed.inject(ExamListComponent)
    }))

    describe('Initialization', () => {
        it('retrieves exams', () => {
            component.ngOnInit()

            expect(component.maturityExams).toBeDefined()
        })

    })

})
