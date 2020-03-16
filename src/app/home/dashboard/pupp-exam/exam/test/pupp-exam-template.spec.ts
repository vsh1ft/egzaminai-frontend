import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { PuppExamComponent } from '../pupp-exam.component'
import { PuppExamModule } from '../pupp-exam.module'
import { PuppExam } from '../pupp-exam'
import { PuppExamService } from '../service/pupp-exam.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { of } from 'rxjs'

describe(`${PuppExamComponent.name} template`, () => {

    let component: PuppExamComponent
    let fixture: ComponentFixture<PuppExamComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PuppExamModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: PuppExamService,
                    useValue: createSpyObj(PuppExamService.name, ['getExams'])
                }
            ],
            declarations: [PuppExamComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new PuppExam('name1', 2013, 'url')
        const physicsProgram = new PuppExam('name2', 2014, 'url');
        (TestBed.inject(PuppExamService) as SpyObj<PuppExamService>).getExams.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(PuppExamComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('Sorts by year', async () => {
        getElements('.mat-sort-header-arrow')[0].click()
        fixture.detectChanges()

        const templateContent = fixture.nativeElement.textContent
        expect(templateContent.indexOf('2013')).toBeLessThan(templateContent.indexOf('2014'))
    })

    function getElements(selector: string) {
        return fixture.debugElement.nativeElement.querySelectorAll(selector)
    }

})
