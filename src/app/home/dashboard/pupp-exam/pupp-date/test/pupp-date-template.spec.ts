import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { PuppDateComponent } from '../pupp-date.component'
import { PuppDateModule } from '../pupp-date.module'
import { PuppDate } from '../pupp-date'
import { of } from 'rxjs'
import { PuppExamName } from '../../pupp-exam-name'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CrudService } from '../../../../../service/crud/crud.service'
import { By } from '@angular/platform-browser'
import objectContaining = jasmine.objectContaining

describe(`${PuppDateComponent.name} template`, () => {

    let component: PuppDateComponent
    let fixture: ComponentFixture<PuppDateComponent>

    let serviceSpy: SpyObj<CrudService>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PuppDateModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ],
            declarations: [PuppDateComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new PuppDate('id1', PuppExamName.LITHUANIAN_LANGUAGE_WRITING_I,'',  'date')
        const physicsProgram = new PuppDate('id2', PuppExamName.LITHUANIAN_LANGUAGE_WRITING_II,  '','date')
        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(PuppDateComponent)
        component = fixture.componentInstance
        component.ngOnInit()
        fixture.detectChanges()
    })

    it('creates template', async () => {
        expect(fixture.nativeElement.textContent).toBeDefined()
    })

    it('retrieves dates', () => {
        getElement('#add-icon').click()

        expect(serviceSpy.create).toHaveBeenCalledWith('/pupp-dates', component.newDate)
    })

    it('adds new date row', () => {
        getElement('#add-icon').click()

        expect(getElements('mat-row').length).toEqual(3)
    })

    it('removes date row', () => {
        getElement('#delete-icon').click()
        fixture.detectChanges()

        expect(getElements('mat-row').length).toEqual(1)
    })

    it('updates date name', () => {
        getElements('.mat-select')[0].click()
        fixture.detectChanges()
        fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement.click()
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/pupp-dates', objectContaining({name: Object.keys(PuppExamName)[1]}))
    })

    it('updates date time', () => {
        getElement('.date-time').dispatchEvent(new Event('input'))
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalled()
    })

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
