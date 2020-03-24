import { async, TestBed } from '@angular/core/testing'

import { PuppExamComponent } from '../pupp-exam.component'
import { PuppExamService } from '../service/pupp-exam.service'
import { PuppExam } from '../pupp-exam'
import { of } from 'rxjs'
import { PuppExamName } from '../../pupp-exam-name'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${PuppExamComponent.name}`, () => {
    let component: PuppExamComponent
    let serviceSpy: SpyObj<PuppExamService>
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [PuppExamComponent,
                {
                    provide: PuppExamService,
                    useValue: createSpyObj(PuppExamService.name, ['getExams'])
                }
            ]
        })

        serviceSpy = TestBed.inject(PuppExamService) as SpyObj<PuppExamService>
        serviceSpy.getExams.and.returnValue(of([new PuppExam(PuppExamName.MATH, 2012, 'url')]))
        component = TestBed.inject(PuppExamComponent)
    }))

    describe('Initialization', () => {
        it('retrieves exams', () => {
            component.ngOnInit()

            expect(component.exams).toBeDefined()
        })
    })

})
