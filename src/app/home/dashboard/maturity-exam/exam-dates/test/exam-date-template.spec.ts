import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamDateComponent } from '../exam-date.component'
import { ExamDateModule } from '../exam-date.module'
import { ExamDate } from '../exam-date'
import { ExamDateService } from '../service/exam-date.service'
import { of } from 'rxjs'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${ExamDateComponent.name} template`, () => {

    let component: ExamDateComponent
    let fixture: ComponentFixture<ExamDateComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ExamDateModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: ExamDateService,
                    useValue: createSpyObj(ExamDateService.name, ['getDates'])
                }
            ],
            declarations: [ExamDateComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new ExamDate(MaturityExam.LITHUANIAN_LANGUAGE, ExamType.NATIONAL_LEVEL, 'date')
        const physicsProgram = new ExamDate(MaturityExam.LITHUANIAN_LANGUAGE, ExamType.NATIONAL_LEVEL, 'date');
        (TestBed.inject(ExamDateService) as SpyObj<ExamDateService>).getDates.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(ExamDateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

})
