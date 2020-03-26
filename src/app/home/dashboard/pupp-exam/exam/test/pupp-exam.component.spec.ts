import { async, TestBed } from '@angular/core/testing'

import { PuppExamComponent } from '../pupp-exam.component'
import { PuppExam } from '../pupp-exam'
import { of } from 'rxjs'
import { PuppExamName } from '../../pupp-exam-name'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CrudService } from '../../../../../service/crud/crud.service'

describe(`${PuppExamComponent.name}`, () => {
    let component: PuppExamComponent
    let serviceSpy: SpyObj<CrudService>

    const exam = new PuppExam('id', PuppExamName.MATH, 2012, 'url')
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [PuppExamComponent,
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ]
        })

        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([exam]))
        component = TestBed.inject(PuppExamComponent)
    }))

    describe('Initialization', () => {
        it('retrieves exams', () => {
            component.ngOnInit()

            expect(component.exams).toBeDefined()
        })
    })

    it('adds an pupp exam row', () => {
        component.ngOnInit()

        component.addRow()

        expect(component.exams.data.length).toEqual(2)
        expect(component.exams.data[1]).toEqual(component.newExam)
    })

    it('clears urls after adding a new row', () => {
        component.ngOnInit()
        component.newExam.examUrl = 'url1'

        component.addRow()

        expect(component.newExam.examUrl).toEqual('')
    })

    it('saves new pupp exam', () => {
        component.ngOnInit()

        component.saveNewExam()

        expect(serviceSpy.create).toHaveBeenCalledWith('/pupp-exams', component.newExam)
    })

    it('updates pupp exam', () => {
        component.ngOnInit()

        component.updateExam(exam)

        expect(serviceSpy.update).toHaveBeenCalledWith('/pupp-exams', exam)
    })

    it('deletes pupp exam', () => {
        component.ngOnInit()

        component.delete(exam)

        expect(serviceSpy.delete).toHaveBeenCalledWith('/pupp-exams', exam.id)
    })

    it('removes exam row', () => {
        component.ngOnInit()

        component.delete(exam)

        expect(component.exams.data.length).toEqual(0)
    })

})
