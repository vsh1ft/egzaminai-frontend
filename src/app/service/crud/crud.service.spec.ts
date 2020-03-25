import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { CrudService } from './crud.service'
import { ObservableHttpService } from '../http-service/observable-http.service'
import { Exam } from '../../home/dashboard/maturity-exam/exam-list/type/exam'
import { ExamType } from '../../home/dashboard/maturity-exam/exam-dates/exam-type'
import { MaturityExam } from '../../home/dashboard/maturity-exam/maturity-exam'

describe(`${CrudService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: CrudService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CrudService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['get', 'post', 'put', 'delete'])
                }
            ]
        })
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        service = TestBed.inject(CrudService)
    })

    it('retrieves all entities', done => {
        const expectedResponse = [new Exam('', MaturityExam.PHYSICS, 2015, ExamType.SCHOOL_LEVEL, '', '')]
        httpServiceSpy.get.withArgs(`/exams`).and.returnValue(of(expectedResponse))

        service.retrieveAll(`/exams`)
            .subscribe((exams) => {
                expect(exams).toEqual(expectedResponse)
                done()
            })
    })

    it('creates entity', done => {
        const exam = new Exam('', MaturityExam.PHYSICS, 2015, ExamType.SCHOOL_LEVEL, '', ' ')
        httpServiceSpy.post.withArgs(`/exams`, exam).and.returnValue(of(undefined))

        service.create(`/exams`, exam)
        done()

        expect(httpServiceSpy.post).toHaveBeenCalled()
    })

    it('updates entity', done => {
        const exam = new Exam('', MaturityExam.PHYSICS, 2015, ExamType.SCHOOL_LEVEL, '', ' ')
        httpServiceSpy.put.withArgs(`/exams`, exam).and.returnValue(of(undefined))

        service.update(`/exams`, exam)
        done()

        expect(httpServiceSpy.put).toHaveBeenCalled()
    })

    it('deletes entity', done => {
        httpServiceSpy.delete.withArgs(`/exams/id`).and.returnValue(of(undefined))

        service.delete(`/exams`, 'id')
        done()

        expect(httpServiceSpy.delete).toHaveBeenCalled()
    })

})
