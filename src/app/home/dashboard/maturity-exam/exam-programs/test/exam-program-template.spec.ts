import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { ExamProgramComponent } from '../exam-program.component'
import { ExamProgramModule } from '../exam-program.module'
import { ExamProgram } from '../exam-program'
import { ExamProgramService } from '../service/exam-program.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { of } from 'rxjs'

describe(`${ExamProgramComponent.name} template`, () => {

    let component: ExamProgramComponent
    let fixture: ComponentFixture<ExamProgramComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ExamProgramModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: ExamProgramService,
                    useValue: createSpyObj(ExamProgramService.name, ['getPrograms'])
                }
            ],
            declarations: [ExamProgramComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new ExamProgram('name1', 'Muzikos istorijos ir teorijos testas', 'url')
        const physicsProgram = new ExamProgram('name2', 'Fizika', 'url');
        (TestBed.inject(ExamProgramService) as SpyObj<ExamProgramService>).getPrograms.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(ExamProgramComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Sorts by subject', async () => {
        getElements('.mat-sort-header-arrow')[0].click()
        fixture.detectChanges()

        const templateContent = fixture.nativeElement.textContent
        expect(templateContent.indexOf('Fizika')).toBeLessThan(templateContent.indexOf('Muzikos istorijos ir teorijos testas'))
    })

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
