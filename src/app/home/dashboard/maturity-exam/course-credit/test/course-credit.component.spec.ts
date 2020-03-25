import { async, TestBed } from '@angular/core/testing'

import { CourseCreditComponent } from '../course-credit.component'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CourseCredit } from '../course-credit'
import { of } from 'rxjs'
import { CrudService } from '../../../../../service/crud/crud.service'

describe(`${CourseCreditComponent.name}`, () => {
    let component: CourseCreditComponent
    let serviceSpy: SpyObj<CrudService>

    const credit = new CourseCredit('id', 'name', 2012, 'url')
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [CourseCreditComponent,
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ]
        })

        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([credit]))
        component = TestBed.inject(CourseCreditComponent)
    }))

    describe('Initialization', () => {
        it('retrieves exams', () => {
            component.ngOnInit()

            expect(component.credits).toBeDefined()
        })
    })

    it('adds credits row', () => {
        component.ngOnInit()

        component.addRow()

        expect(component.credits.data.length).toEqual(2)
        expect(component.credits.data[1]).toEqual(component.newCredit)
    })

    it('saves new credit', () => {
        component.ngOnInit()

        component.saveNewCredit()

        expect(serviceSpy.create).toHaveBeenCalledWith('/credits', component.newCredit)
    })

    it('updates credit', () => {
        component.ngOnInit()

        component.updateCredit(credit)

        expect(serviceSpy.update).toHaveBeenCalledWith('/credits', credit)
    })

    it('deletes credit', () => {
        component.ngOnInit()

        component.delete(credit)

        expect(serviceSpy.delete).toHaveBeenCalledWith('/credits', credit.id)
    })

    it('removes credit row', () => {
        component.ngOnInit()

        component.delete(credit)

        expect(component.credits.data.length).toEqual(0)
    })

})
