import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { PuppDate } from '../pupp-date'

@Injectable()
export class PuppDateService {
    constructor(private httpService: ObservableHttpService) {
    }

    getDates(): Observable<Array<PuppDate>> {
        return this.httpService.get<Array<PuppDate>>(`/pupp-dates`)
            .pipe(map(valid => valid))
    }


}
