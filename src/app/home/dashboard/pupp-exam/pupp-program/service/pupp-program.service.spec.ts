import { TestBed } from '@angular/core/testing'
import { of } from 'rxjs'
import createSpyObj = jasmine.createSpyObj
import SpyObj = jasmine.SpyObj
import { PuppProgramService } from './pupp-program.service'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { PuppProgram } from '../pupp-program'

describe(`${PuppProgramService.name}`, () => {

    let httpServiceSpy: SpyObj<ObservableHttpService>
    let service: PuppProgramService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PuppProgramService,
                {
                    provide: ObservableHttpService,
                    useValue: createSpyObj(ObservableHttpService.name, ['get'])
                }
            ]
        })
        httpServiceSpy = TestBed.inject(ObservableHttpService) as SpyObj<ObservableHttpService>
        service = TestBed.inject(PuppProgramService)
    })

    it('retrieves programs', done => {
        const expectedResponse = [new PuppProgram('name', 'url')]
        httpServiceSpy.get.withArgs(`/pupp-programs`).and.returnValue(of(expectedResponse))

        service.getPrograms()
            .subscribe((exams) => {
                expect(exams).toEqual(expectedResponse)
                done()
            })
    })

})
