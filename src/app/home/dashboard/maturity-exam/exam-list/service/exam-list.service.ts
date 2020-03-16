import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { Exam } from '../exam'

@Injectable()
export class ExamListService {
    constructor(private httpService: ObservableHttpService) {
    }

    getExams(): Observable<Array<Exam>> {
        return this.httpService.get<Array<Exam>>(`/exams`)
            .pipe(map(valid => valid))
    }


}
