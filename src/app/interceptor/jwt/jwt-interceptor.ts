import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { SessionService } from '../../service/session/session.service'


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private sessionService: SessionService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!!this.sessionService.get())
            req = req.clone({
                setHeaders: {
                    Authorization: this.sessionService.get()
                }
            })
        return next.handle(req)
    }
}
