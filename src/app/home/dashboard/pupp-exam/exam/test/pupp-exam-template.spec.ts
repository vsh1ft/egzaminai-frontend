import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { PuppExamComponent } from '../pupp-exam.component'
import { PuppExamModule } from '../pupp-exam.module'
import { of } from 'rxjs'
import { PuppExamName } from '../../pupp-exam-name'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { By } from '@angular/platform-browser'
import { CrudService } from '../../../../../service/crud/crud.service'
import objectContaining = jasmine.objectContaining
import { PuppExam } from '../pupp-exam'

describe(`${PuppExamComponent.name} template`, () => {

    let component: PuppExamComponent
    let fixture: ComponentFixture<PuppExamComponent>
    let serviceSpy: SpyObj<CrudService>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PuppExamModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: CrudService,
                    useValue: createSpyObj(CrudService.name, ['retrieveAll', 'create', 'update', 'delete'])
                }
            ],
            declarations: [PuppExamComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        serviceSpy = TestBed.inject(CrudService) as SpyObj<CrudService>
        const musicProgram = new PuppExam('id1', PuppExamName.LITHUANIAN_LANGUAGE_WRITING_I, 2013, 'url')
        const physicsProgram = new PuppExam('id2', PuppExamName.LITHUANIAN_LANGUAGE_WRITING_II, 2014, 'url');
        serviceSpy.retrieveAll.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(PuppExamComponent)
        component = fixture.componentInstance
        component.ngOnInit()
        fixture.detectChanges()
    })

    it('retrieves pupp exams', () => {
        getElement('#add-icon').click()

        expect(serviceSpy.create).toHaveBeenCalledWith('/pupp-exams', component.newExam)
    })

    it('adds new pupp exam row', () => {
        getElement('#add-icon').click()
        fixture.detectChanges()

        expect(getElements('mat-row').length).toEqual(3)
    })

    it('removes pupp exam row', () => {
        getElement('#delete-icon').click()
        fixture.detectChanges()

        expect(getElements('mat-row').length).toEqual(1)
    })

    it('updates pupp exam name', () => {
        getElements('.mat-select')[0].click()
        fixture.detectChanges()
        fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement.click()
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/pupp-exams', objectContaining({name: Object.keys(PuppExamName)[1]}))
    })

    it('updates pupp pexam year', () => {
        getElements('.mat-select')[1].click()
        fixture.detectChanges()
        fixture.debugElement.queryAll(By.css('.mat-option'))[1].nativeElement.click()
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/pupp-exams', objectContaining({year: 2024}))
    })

    it('updates pupp exam type', () => {
        getElements('.exam-url')[0].value = 'value'
        getElements('.exam-url')[0].dispatchEvent(new Event('input'))
        fixture.detectChanges()

        expect(serviceSpy.update).toHaveBeenCalledWith('/pupp-exams', objectContaining({examUrl: 'value'}))
    })

    function getElement(selector: string): any {
        return fixture.debugElement.nativeElement.querySelector(selector)
    }

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
