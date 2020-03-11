import { HttpResponse } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { ObservableHttpService } from './observable-http.service'

describe(`${ObservableHttpService.name}`, () => {
    let service: ObservableHttpService
    let testingController: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ObservableHttpService]
        })

        service = TestBed.inject(ObservableHttpService)
        testingController = TestBed.inject(HttpTestingController)
    })

    afterEach(() => {
        testingController.verify()
    })

    describe('Post', () => {

        it('Posts data', () => {
            const expectedBody = 'body'
            const url = '/some/path'

            service.post<string, string>(url, expectedBody)
                .subscribe((response: string) =>
                    expect(response).toEqual(expectedBody)
                )

            const req = testingController.expectOne(url)
            expect(req.request.method).toEqual('POST')
            expect(req.request.body).toEqual(expectedBody)
            req.event(new HttpResponse({body: expectedBody}))
        })

    })

})
