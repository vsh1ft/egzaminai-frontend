import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { ExamProgramService } from './exam-program.service'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { ExamProgram } from '../exam-program'

describe(`${ExamProgramService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: ExamProgramService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExamProgramService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['get'])
                }
            ]
        })
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        service = TestBed.inject(ExamProgramService)
    })

    it('retrieves programs', done => {
        const expectedResponse = [new ExamProgram('name', 'subject', 'url')]
        httpServiceSpy.get.withArgs(`/programs`).and.returnValue(of(expectedResponse))

        service.getPrograms()
            .subscribe((exams) => {
                expect(exams).toEqual(expectedResponse)
                done()
            })
    })

})
