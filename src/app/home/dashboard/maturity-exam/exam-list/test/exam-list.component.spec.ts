import { async, TestBed } from '@angular/core/testing'

import { ExamListComponent } from '../exam-list.component'
import { Exam } from '../type/exam'
import { of } from 'rxjs'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../../exam-dates/exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CrudService } from '../../../../../service/crud/crud.service'

describe(`${ExamListComponent.name}`, () => {
    let component: ExamListComponent
    let serviceSpy: SpyObj<CrudService>

    const exam = new Exam('', MaturityExam.PHYSICS, 2014, ExamType.SCHOOL_LEVEL, 'someUrl', 'answUrl')
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ExamListComponent,
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ]
        })

        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([exam]))
        component = TestBed.inject(ExamListComponent)
    }))

    describe('Initialization', () => {
        it('retrieves exams', () => {
            component.ngOnInit()

            expect(component.maturityExams).toBeDefined()
        })

    })

    it('adds an exam row', () => {
        component.ngOnInit()

        component.addRow()

        expect(component.maturityExams.data.length).toEqual(2)
        expect(component.maturityExams.data[1]).toEqual(component.newExam)
    })

    it('clears urls after adding a new row', () => {
        component.ngOnInit()
        component.newExam.examUrl = 'url1'
        component.newExam.answerUrl = 'url2'

        component.addRow()

        expect(component.newExam.examUrl).toEqual('')
        expect(component.newExam.answerUrl).toEqual('')
    })

    it('saves new exam', () => {
        component.ngOnInit()

        component.saveNewExam()

        expect(serviceSpy.create).toHaveBeenCalledWith('/exams', component.newExam)
    })

    it('updates exam', () => {
        component.ngOnInit()

        component.updateExam(exam)

        expect(serviceSpy.update).toHaveBeenCalledWith('/exams', exam)
    })

    it('deletes exam', () => {
        component.ngOnInit()

        component.delete(exam)

        expect(serviceSpy.delete).toHaveBeenCalledWith('/exams', exam.id)
    })

    it('removes exam row', () => {
        component.ngOnInit()

        component.delete(exam)

        expect(component.maturityExams.data.length).toEqual(0)
    })
})
