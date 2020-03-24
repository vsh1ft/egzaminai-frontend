import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { PuppDateService } from './pupp-date.service'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { PuppDate } from '../pupp-date'
import { PuppExamName } from '../../pupp-exam-name'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${PuppDateService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: PuppDateService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PuppDateService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['get'])
                }
            ]
        })
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        service = TestBed.inject(PuppDateService)
    })

    it('retrieves exam dates', done => {
        const expectedResponse = [new PuppDate(PuppExamName.MATH, 'date')]
        httpServiceSpy.get.withArgs(`/pupp-dates`).and.returnValue(of(expectedResponse))

        service.getDates()
            .subscribe((exams) => {
                expect(exams).toEqual(expectedResponse)
                done()
            })
    })

})
