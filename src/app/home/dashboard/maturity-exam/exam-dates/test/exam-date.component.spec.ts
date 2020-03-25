import { async, TestBed } from '@angular/core/testing'

import { ExamDateComponent } from '../exam-date.component'
import { ExamDate } from '../exam-date'
import { of } from 'rxjs'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CrudService } from '../../../../../service/crud/crud.service'

describe(`${ExamDateComponent.name}`, () => {
    let component: ExamDateComponent
    let serviceSpy: SpyObj<CrudService>

    const date = new ExamDate('id', MaturityExam.ENGLISH_LANGUAGE, ExamType.SCHOOL_LEVEL, 'date')
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ExamDateComponent,
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ]
        })

        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([date]))
        component = TestBed.inject(ExamDateComponent)
    }))

    describe('Initialization', () => {
        it('retrieves dates', () => {
            component.ngOnInit()

            expect(component.dates).toBeDefined()
        })
    })

    it('adds dates row', () => {
        component.ngOnInit()

        component.addRow()

        expect(component.dates.data.length).toEqual(2)
        expect(component.dates.data[1]).toEqual(component.newDate)
    })

    it('saves new date', () => {
        component.ngOnInit()

        component.saveNewDate()

        expect(serviceSpy.create).toHaveBeenCalledWith('/dates', component.newDate)
    })

    it('updates date', () => {
        component.ngOnInit()

        component.updateDate(date)

        expect(serviceSpy.update).toHaveBeenCalledWith('/dates', date)
    })

    it('deletes date', () => {
        component.ngOnInit()

        component.delete(date)

        expect(serviceSpy.delete).toHaveBeenCalledWith('/dates', date.id)
    })

    it('removes date row', () => {
        component.ngOnInit()

        component.delete(date)

        expect(component.dates.data.length).toEqual(0)
    })

})
