import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { PuppExamService } from './pupp-exam.service'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { PuppExam } from '../pupp-exam'

describe(`${PuppExamService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: PuppExamService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PuppExamService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['get'])
                }
            ]
        })
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        service = TestBed.inject(PuppExamService)
    })

    it('retrieves pupp exams', done => {
        const expectedResponse = [new PuppExam('name', 2012, 'url')]
        httpServiceSpy.get.withArgs(`/pupp-exams`).and.returnValue(of(expectedResponse))

        service.getExams()
            .subscribe((exams) => {
                expect(exams).toEqual(expectedResponse)
                done()
            })
    })

})
