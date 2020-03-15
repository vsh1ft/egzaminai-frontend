import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamListComponent } from '../exam-list.component'
import { ExamListModule } from '../exam-list.module'
import { Exam } from '../exam'
import { ExamListService } from '../service/exam-list.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { of } from 'rxjs'

describe(`${ExamListComponent.name} template`, () => {

    let component: ExamListComponent
    let fixture: ComponentFixture<ExamListComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({

            imports: [
                ExamListModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: ExamListService,
                    useValue: createSpyObj(ExamListService.name, ['getExams'])
                }
            ],
            declarations: [ExamListComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents()
        const musicExam = new Exam('Muzikos istorijos ir teorijos testas', 2013, 'MBE', 'someUrl', 'answUrl')
        const physicsExam = new Exam('Fizika', 2014, 'VBE', 'someUrl', 'answUrl');
        (TestBed.inject(ExamListService) as SpyObj<ExamListService>).getExams.and.returnValue(of([musicExam, physicsExam]))

        fixture = TestBed.createComponent(ExamListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Sorts by name', async () => {
        getElements('.mat-sort-header-arrow')[0].click()
        fixture.detectChanges()

        const templateContent = fixture.nativeElement.textContent
        expect(templateContent.indexOf('Fizika')).toBeLessThan(templateContent.indexOf('Muzikos istorijos ir teorijos testas'))
    })

    it('Sorts by year', async () => {
        getElements('.mat-sort-header-arrow')[1].click()
        fixture.detectChanges()
        getElements('.mat-sort-header-arrow')[1].click()
        fixture.detectChanges()

        const templateContent = fixture.nativeElement.textContent
        expect(templateContent.indexOf('2014')).toBeLessThan(templateContent.indexOf('2013'))
    })

    it('Sorts by type', async () => {
        getElements('.mat-sort-header-arrow')[2].click()
        fixture.detectChanges()
        getElements('.mat-sort-header-arrow')[2].click()
        fixture.detectChanges()

        const templateContent = fixture.nativeElement.textContent
        expect(templateContent.indexOf('VBE')).toBeLessThan(templateContent.indexOf('MBE'))
    })

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
