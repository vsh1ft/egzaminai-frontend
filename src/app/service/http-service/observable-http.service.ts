import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable()
export class ObservableHttpService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    constructor(private http: HttpClient) {
    }

    post<I, O>(path: string, data?: I): Observable<O> {
        return this.http.post(environment.backendUrl + path, data, this.httpOptions)
            .pipe(map((token) => {
                return token as O
            }))
    }

    put<I, O>(path: string, data: I): Observable<O> {
        return this.http.put(environment.backendUrl + path, data, this.httpOptions)
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

    delete<O>(path: string): Observable<O> {
        return this.http.delete(environment.backendUrl + path)
            .pipe(map((token) => {
                return token as O
            }))
    }
}
