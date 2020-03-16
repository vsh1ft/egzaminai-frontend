import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { PuppExam } from '../pupp-exam'

@Injectable()
export class PuppExamService {
    constructor(private httpService: ObservableHttpService) {
    }

    getExams(): Observable<Array<PuppExam>> {
        return this.httpService.get<Array<PuppExam>>(`/pupp-exams`)
            .pipe(map(valid => valid))
    }


}
