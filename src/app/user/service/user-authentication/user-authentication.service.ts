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

    isValid(credentials: Credentials): Observable<boolean> {
        return this.httpService.post<Credentials, boolean>(`/user/is-valid`, credentials)
            .pipe(map(valid => valid))
    }

    login(credentials: Credentials): Observable<void> {
        return this.httpService.post<Credentials, string>(`/user/authenticate`, credentials)
            .pipe(map((token) => {
                this.sessionService.set(token)
            }))
    }

}
