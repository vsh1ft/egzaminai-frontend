import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { CourseCreditComponent } from '../course-credit.component'
import { CourseCreditModule } from '../course-credit.module'
import { CourseCredit } from '../course-credit'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { of } from 'rxjs'
import { CrudService } from '../../../../../service/crud/crud.service'
import { By } from '@angular/platform-browser'
import objectContaining = jasmine.objectContaining

describe(`${CourseCreditComponent.name} template`, () => {

    let component: CourseCreditComponent
    let fixture: ComponentFixture<CourseCreditComponent>
    let serviceSpy: SpyObj<CrudService>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CourseCreditModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ],
            declarations: [CourseCreditComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new CourseCredit('id1', 'name1', 2013, 'url')
        const physicsProgram = new CourseCredit('id2', 'name2', 2014, 'url');
        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(CourseCreditComponent)
        component = fixture.componentInstance
        component.ngOnInit()
        fixture.detectChanges()
    })

    it('retrieves credits', () => {
        getElement('#add-icon').click()

        expect(serviceSpy.create).toHaveBeenCalledWith('/credits', component.newCredit)
    })

    it('adds new credit row', () => {
        getElement('#add-icon').click()

        expect(getElements('mat-row').length).toEqual(3)
    })

    it('removes credit row', () => {
        getElement('#delete-icon').click()
        fixture.detectChanges()

        expect(getElements('mat-row').length).toEqual(1)
    })

    it('updates credit name', () => {
        getElement('.credit-name').value = 'value'
        getElement('.credit-name').dispatchEvent(new Event('input'))
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/credits', objectContaining({name: 'value'}))
    })

    it('updates credit year', () => {
        getElements('.mat-select')[0].click()
        fixture.detectChanges()
        fixture.debugElement.queryAll(By.css('.mat-option'))[0].nativeElement.click()
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/credits', objectContaining({year: 2025}))
    })

    it('updates credit url', () => {
        getElement('.credit-url').value = 'value'
        getElement('.credit-url').dispatchEvent(new Event('input'))
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/credits', objectContaining({creditUrl: 'value'}))
    })

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
