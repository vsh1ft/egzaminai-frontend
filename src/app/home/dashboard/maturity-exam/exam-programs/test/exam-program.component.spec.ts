import { async, TestBed } from '@angular/core/testing'

import { ExamProgramComponent } from '../exam-program.component'
import { ExamProgramService } from '../service/exam-program.service'
import { ExamProgram } from '../exam-program'
import { of } from 'rxjs'
import { Subject } from '../subject'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${ExamProgramComponent.name}`, () => {
    let component: ExamProgramComponent
    let serviceSpy: SpyObj<ExamProgramService>
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ExamProgramComponent,
                {
                    provide: ExamProgramService,
                    useValue: createSpyObj(ExamProgramService.name, ['getPrograms'])
                }
            ]
        })

        serviceSpy = TestBed.inject(ExamProgramService) as SpyObj<ExamProgramService>
        serviceSpy.getPrograms.and.returnValue(of([new ExamProgram('name', Subject.ART, 'url')]))
        component = TestBed.inject(ExamProgramComponent)
    }))

    describe('Initialization', () => {
        it('retrieves exams', () => {
            component.ngOnInit()

            expect(component.programs).toBeDefined()
        })
    })

})
