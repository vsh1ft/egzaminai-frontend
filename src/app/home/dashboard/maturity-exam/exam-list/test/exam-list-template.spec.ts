import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamListComponent } from '../exam-list.component'
import { ExamListModule } from '../exam-list.module'
import { Exam } from '../type/exam'
import { of } from 'rxjs'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../../exam-dates/exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { By } from '@angular/platform-browser'
import objectContaining = jasmine.objectContaining
import { CrudService } from '../../../../../service/crud/crud.service'

describe(`${ExamListComponent.name} template`, () => {

    let component: ExamListComponent
    let fixture: ComponentFixture<ExamListComponent>
    let serviceSpy: SpyObj<CrudService>

    beforeEach(async () => {
        await TestBed.configureTestingModule({

            imports: [
                ExamListModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update'])
                }
            ],
            declarations: [ExamListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        const musicExam = new Exam('id1', MaturityExam.HISTORY, 2013, ExamType.SCHOOL_LEVEL, 'someUrl', 'answUrl')
        const physicsExam = new Exam('id2', MaturityExam.PHYSICS, 2014, ExamType.NATIONAL_LEVEL, 'someUrl', 'answUrl')
        serviceSpy.retrieveAll.and.returnValue(of([musicExam, physicsExam]))

        fixture = TestBed.createComponent(ExamListComponent)
        component = fixture.componentInstance
        component.ngOnInit()
        fixture.detectChanges()
    })

    it('retrieves exams', () => {
        getElement('#add-icon').click()

        expect(serviceSpy.create).toHaveBeenCalledWith('/exams', component.newExam)
    })

    it('adds new exam row', () => {
        getElement('#add-icon').click()

        expect(getElements('mat-row').length).toEqual(3)
    })

    it('updates exam name', () => {
        getElements('.mat-select')[0].click()
        fixture.detectChanges()
        fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement.click()
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/exams', objectContaining({name: Object.keys(MaturityExam)[1]}))
    })

    it('updates exam year', () => {
        getElements('.mat-select')[1].click()
        fixture.detectChanges()
        fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement.click()
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/exams', objectContaining({year: 2024}))
    })

    it('updates exam type', () => {
        getElements('.mat-select')[2].click()
        fixture.detectChanges()
        fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement.click()
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/exams', objectContaining({type: Object.keys(ExamType)[1]}))
    })

    it('updates exam url', () => {
        getElements('.exam-url')[0].value = 'value'
        getElements('.exam-url')[0].dispatchEvent(new Event('input'))
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/exams', objectContaining({examUrl: 'value'}))
    })

    it('updates answer url', () => {
        getElements('.answer-url')[0].value = 'value'
        getElements('.answer-url')[0].dispatchEvent(new Event('input'))
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/exams', objectContaining({answerUrl: 'value'}))
    })

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
