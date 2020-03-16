import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { CourseCreditComponent } from '../course-credit.component'
import { CourseCreditModule } from '../course-credit.module'
import { CourseCredit } from '../course-credit'
import { CourseCreditService } from '../service/course-credit.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { of } from 'rxjs'

describe(`${CourseCreditComponent.name} template`, () => {

    let component: CourseCreditComponent
    let fixture: ComponentFixture<CourseCreditComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CourseCreditModule,
                NoopAnimationsModule
            ],
            providers: [
                {
                    provide: CourseCreditService,
                    useValue: createSpyObj(CourseCreditService.name, ['getCredits'])
                }
            ],
            declarations: [CourseCreditComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        const musicProgram = new CourseCredit('name1', 2013, 'url')
        const physicsProgram = new CourseCredit('name2', 2014, 'url');
        (TestBed.inject(CourseCreditService) as SpyObj<CourseCreditService>).getCredits.and.returnValue(of([musicProgram, physicsProgram]))

        fixture = TestBed.createComponent(CourseCreditComponent)
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
