import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamDateComponent } from '../exam-date.component'
import { ExamDateModule } from '../exam-date.module'
import { ExamDate } from '../exam-date'
import { of } from 'rxjs'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { By } from '@angular/platform-browser'
import { CrudService } from '../../../../../service/crud/crud.service'
import objectContaining = jasmine.objectContaining

describe(`${ExamDateComponent.name} template`, () => {

    let component: ExamDateComponent
    let fixture: ComponentFixture<ExamDateComponent>
    let serviceSpy: SpyObj<CrudService>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ExamDateModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ],
            declarations: [ExamDateComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new ExamDate('id', MaturityExam.LITHUANIAN_LANGUAGE, ExamType.NATIONAL_LEVEL, '', 'date')
        const physicsProgram = new ExamDate('id2', MaturityExam.LITHUANIAN_LANGUAGE, ExamType.NATIONAL_LEVEL,'',  'date')
        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        serviceSpy.retrieveAll.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(ExamDateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('retrieves dates', () => {
        getElement('#add-icon').click()

        expect(serviceSpy.create).toHaveBeenCalledWith('/dates', component.newDate)
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

        expect(serviceSpy.update).toHaveBeenCalledWith('/dates', objectContaining({name: Object.keys(MaturityExam)[1]}))
    })

    it('updates date type', () => {
        getElements('.mat-select')[1].click()
        fixture.detectChanges()
        fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement.click()
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/dates', objectContaining({type: Object.keys(ExamType)[1]}))
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
