import { async, TestBed } from '@angular/core/testing'

import { CourseCreditComponent } from '../course-credit.component'
import { CourseCreditService } from '../service/course-credit.service'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CourseCredit } from '../course-credit'
import { of } from 'rxjs'

describe(`${CourseCreditComponent.name}`, () => {
    let component: CourseCreditComponent
    let serviceSpy: SpyObj<CourseCreditService>
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [CourseCreditComponent,
                {
                    provide: CourseCreditService,
                    useValue: createSpyObj(CourseCreditService.name, ['getCredits'])
                }
            ]
        })

        serviceSpy = TestBed.inject(CourseCreditService) as SpyObj<CourseCreditService>
        serviceSpy.getCredits.and.returnValue(of([new CourseCredit('name', 2012, 'url')]))
        component = TestBed.inject(CourseCreditComponent)
    }))

    describe('Initialization', () => {
        it('retrieves exams', () => {
            component.ngOnInit()

            expect(component.credits).toBeDefined()
        })
    })

})
