import { async, TestBed } from '@angular/core/testing'

import { PuppDateComponent } from '../pupp-date.component'
import { PuppDate } from '../pupp-date'
import { of } from 'rxjs'
import { PuppExamName } from '../../pupp-exam-name'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CrudService } from '../../../../../service/crud/crud.service'

describe(`${PuppDateComponent.name}`, () => {
    let component: PuppDateComponent
    let serviceSpy: SpyObj<CrudService>

    const date = new PuppDate('id', PuppExamName.MATH, '','date')
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [PuppDateComponent,
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ]
        })

        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([date]))
        component = TestBed.inject(PuppDateComponent)
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

        expect(serviceSpy.create).toHaveBeenCalledWith('/pupp-dates', component.newDate)
    })

    it('updates date', () => {
        component.ngOnInit()

        component.updateDate(date)

        expect(serviceSpy.update).toHaveBeenCalledWith('/pupp-dates', date)
    })

    it('deletes date', () => {
        component.ngOnInit()

        component.delete(date)

        expect(serviceSpy.delete).toHaveBeenCalledWith('/pupp-dates', date.id)
    })

    it('removes date row', () => {
        component.ngOnInit()

        component.delete(date)

        expect(component.dates.data.length).toEqual(0)
    })

})
