import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamDateComponent } from '../exam-date.component'
import { ExamDateModule } from '../exam-date.module'
import { ExamDate } from '../exam-date'
import { ExamDateService } from '../service/exam-date.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { of } from 'rxjs'

describe(`${ExamDateComponent.name} template`, () => {

    let component: ExamDateComponent
    let fixture: ComponentFixture<ExamDateComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ExamDateModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: ExamDateService,
                    useValue: createSpyObj(ExamDateService.name, ['getDates'])
                }
            ],
            declarations: [ExamDateComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new ExamDate('name1', 'VBE', 'date')
        const physicsProgram = new ExamDate('name2', 'MBE', 'date');
        (TestBed.inject(ExamDateService) as SpyObj<ExamDateService>).getDates.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(ExamDateComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Sorts by subject', async () => {
        getElements('.mat-sort-header-arrow')[0].click()
        fixture.detectChanges()

        const templateContent = fixture.nativeElement.textContent
        expect(templateContent.indexOf('MBE')).toBeLessThan(templateContent.indexOf('VBE'))
    })

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
