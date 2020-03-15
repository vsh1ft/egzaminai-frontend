import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable()
export class ObservableHttpService {

    constructor(private http: HttpClient) {
    }

    post<I, O>(path: string, data: I): Observable<O> {
        return this.http.post(path, data)
            .pipe(map((token) => {
                return token as O
            }))
    }

    get<O>(path: string): Observable<O> {
        return this.http.get(path)
            .pipe(map((token) => {
                return token as O
            }))
    }
}
