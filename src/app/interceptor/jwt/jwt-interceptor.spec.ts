import { HttpHandler, HttpRequest } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import SpyObj = jasmine.SpyObj
import createSpyObj = jasmine.createSpyObj
import { JwtInterceptor } from './jwt-interceptor'
import { SessionService } from '../../service/session/session.service'

describe(`${JwtInterceptor.name}`, () => {

    let interceptor: JwtInterceptor

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                JwtInterceptor,
                {
                    provide: SessionService,
                    useValue: createSpyObj('SessionService', ['get'])
                }
            ]
        })
        interceptor = TestBed.inject(JwtInterceptor)
    })

    it('Sets header with token', () => {
        const handlerSpy = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle'])
        const httpRequestStub = new HttpRequest<any>('GET', '')
        const expectedRequest = httpRequestStub.clone({setHeaders: {Authorization: 'someToken'}});

        (TestBed.inject(SessionService)  as SpyObj<SessionService>).get.and.returnValue('someToken')


        interceptor.intercept(httpRequestStub, handlerSpy)


        expect(handlerSpy.handle).toHaveBeenCalledWith(expectedRequest)
    })

    it('Doesn`t set header with token', () => {
        const handlerSpy = jasmine.createSpyObj<HttpHandler>('HttpHandler', ['handle'])
        const httpRequestStub = new HttpRequest<any>('GET', '/other')

        interceptor.intercept(httpRequestStub, handlerSpy)


        expect(handlerSpy.handle).toHaveBeenCalledWith(httpRequestStub)
    })

})
