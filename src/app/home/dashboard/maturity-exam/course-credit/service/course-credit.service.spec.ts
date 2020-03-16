import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CourseCreditService } from './course-credit.service'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { CourseCredit } from '../course-credit'

describe(`${CourseCreditService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: CourseCreditService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CourseCreditService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['get'])
                }
            ]
        })
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        service = TestBed.inject(CourseCreditService)
    })

    it('retrieves programs', done => {
        const expectedResponse = [new CourseCredit('name', 2012, 'url')]
        httpServiceSpy.get.withArgs(`/credits`).and.returnValue(of(expectedResponse))

        service.getCredits()
            .subscribe((exams) => {
                expect(exams).toEqual(expectedResponse)
                done()
            })
    })

})
