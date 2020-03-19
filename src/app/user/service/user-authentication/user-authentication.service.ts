import { Credentials } from '../../login/credentials'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ObservableHttpService } from '../../../service/http-service/observable-http.service'
import { SessionService } from '../../../service/session/session.service'

@Injectable()
export class UserAuthenticationService {
    constructor(private httpService: ObservableHttpService,
                private sessionService: SessionService) {
    }

    doesExist(email: string): Observable<boolean> {
        return this.httpService.get<boolean>(`/user/exist/` + email)
            .pipe(map(valid => valid))
    }

    login(credentials: Credentials): Observable<void> {
        return this.httpService.post<Credentials, string>(`/user/login`, credentials)
            .pipe(map((token) => {
                this.sessionService.set(token)
            }))
    }

    create(credentials: Credentials): Observable<void> {
        return this.httpService.post<Credentials, string>(`/user/create`, credentials)
            .pipe(map((token) => {
                this.sessionService.set(token)
            }))
    }

    resetPassword(email: string): Observable<void> {
        return this.httpService.post<string, void>(`/user/reset-password`, email)
    }

}
