import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamListComponent } from '../exam-list.component'
import { ExamListModule } from '../exam-list.module'
import { Exam } from '../type/exam'
import { ExamListService } from '../service/exam-list.service'
import { of } from 'rxjs'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../../exam-dates/exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { Subject } from '../../exam-programs/subject'

describe(`${ExamListComponent.name} template`, () => {

    let component: ExamListComponent
    let fixture: ComponentFixture<ExamListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({

            imports: [
                ExamListModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: ExamListService,
                    useValue: createSpyObj(ExamListService.name, ['getExams'])
                }
            ],
            declarations: [ExamListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicExam = new Exam(MaturityExam.HISTORY, 2013, ExamType.SCHOOL_LEVEL, 'someUrl', 'answUrl')
        const physicsExam = new Exam(MaturityExam.PHYSICS, 2014, ExamType.NATIONAL_LEVEL, 'someUrl', 'answUrl');
        (TestBed.inject(ExamListService) as SpyObj<ExamListService>).getExams.and.returnValue(of([musicExam, physicsExam]))

        fixture = TestBed.createComponent(ExamListComponent)
        component = fixture.componentInstance
        component.ngOnInit()
        fixture.detectChanges()
    })

})
