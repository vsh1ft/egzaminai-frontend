import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { ExamDateService } from './exam-date.service'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { ExamDate } from '../exam-date'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${ExamDateService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: ExamDateService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExamDateService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['get'])
                }
            ]
        })
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        service = TestBed.inject(ExamDateService)
    })

    it('retrieves exam dates', done => {
        const expectedResponse = [new ExamDate(MaturityExam.CHEMISTRY, ExamType.NATIONAL_LEVEL, 'date')]
        httpServiceSpy.get.withArgs(`/dates`).and.returnValue(of(expectedResponse))

        service.getDates()
            .subscribe((exams) => {
                expect(exams).toEqual(expectedResponse)
                done()
            })
    })

})
