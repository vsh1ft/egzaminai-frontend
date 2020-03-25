import { Injectable } from '@angular/core'
import { ObservableHttpService } from '../http-service/observable-http.service'
import { Observable } from 'rxjs'

@Injectable()
export class CrudService {
    constructor(private httpService: ObservableHttpService) {
    }

    create<I>(path: string, data: I) {
        this.httpService.post<I, void>(path, data)
            .subscribe()
    }

    retrieveAll<O>(path: string): Observable<Array<O>> {
        return this.httpService.get<Array<O>>(path)
    }

    update<I>(path: string, data: I) {
        this.httpService.put<I, void>(path, data)
            .subscribe()
    }

    delete(path: string, entityId: string) {
        this.httpService.delete<string>(path + '/' + entityId)
            .subscribe()
    }
}
