import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import { ExamListService } from './exam-list.service'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { Exam } from '../type/exam'
import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../../exam-dates/exam-type'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj

describe(`${ExamListService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: ExamListService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExamListService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['get'])
                }
            ]
        })
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        service = TestBed.inject(ExamListService)
    })

    it('retrieves exams', done => {
        const expectedResponse = [new Exam(MaturityExam.PHYSICS, 2015, ExamType.SCHOOL_LEVEL, '', ' ')]
        httpServiceSpy.get.withArgs(`/exams`).and.returnValue(of(expectedResponse))

        service.getExams()
            .subscribe((exams) => {
                expect(exams).toEqual(expectedResponse)
                done()
            })
    })

})
