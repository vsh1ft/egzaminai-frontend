import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { ExamDate } from '../exam-date'

@Injectable()
export class ExamDateService {
    constructor(private httpService: ObservableHttpService) {
    }

    getDates(): Observable<Array<ExamDate>> {
        return this.httpService.get<Array<ExamDate>>(`/dates`)
            .pipe(map(valid => valid))
    }


}
