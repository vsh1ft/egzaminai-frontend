import { HttpHeaders, HttpResponse } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { ObservableHttpService } from './observable-http.service'
import { environment } from '../../../environments/environment'

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


    it('posts data', () => {
        const expectedBody = 'body'
        const url = '/some/path'

        service.post<string, string>(url, expectedBody)
            .subscribe((response: string) =>
                expect(response).toEqual(expectedBody)
            )

        const req = testingController.expectOne(environment.backendUrl + url)
        expect(req.request.method).toEqual('POST')
        req.event(new HttpResponse({body: expectedBody}))
    })

    it('puts data', () => {
        const expectedBody = 'body'
        const url = '/some/path'

        service.put<string, string>(url, expectedBody)
            .subscribe((response: string) =>
                expect(response).toEqual(expectedBody)
            )

        const req = testingController.expectOne(environment.backendUrl + url)
        expect(req.request.method).toEqual('PUT')
        req.event(new HttpResponse({body: expectedBody}))
    })

    it('gets data', () => {
        const expectedResponse = 'body'
        const url = '/some/path'

        service.get<string>(url)
            .subscribe((response: string) =>
                expect(response).toEqual(expectedResponse)
            )

        const req = testingController.expectOne(environment.backendUrl + url)
        expect(req.request.method).toEqual('GET')
        req.flush(expectedResponse)
    })

    it('delets data', () => {
        const expectedResponse = 'body'
        const url = '/some/path'

        service.delete<string>(url)
            .subscribe((response: string) =>
                expect(response).toEqual(expectedResponse)
            )

        const req = testingController.expectOne(environment.backendUrl + url)
        expect(req.request.method).toEqual('DELETE')
        req.flush(expectedResponse)
    })

})
