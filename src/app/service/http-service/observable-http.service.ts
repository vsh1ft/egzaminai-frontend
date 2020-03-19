import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable()
export class ObservableHttpService {

    constructor(private http: HttpClient) {
    }

    post<I, O>(path: string, data: I): Observable<O> {
        return this.http.post(environment.backendUrl + path, data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(map((token) => {
                return token as O
            }))
    }

    get<O>(path: string): Observable<O> {
        return this.http.get(environment.backendUrl + path)
            .pipe(map((token) => {
                return token as O
            }))
    }
}
