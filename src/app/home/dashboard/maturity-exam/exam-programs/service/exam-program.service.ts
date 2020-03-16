import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { ExamProgram } from '../exam-program'

@Injectable()
export class ExamProgramService {
    constructor(private httpService: ObservableHttpService) {
    }

    getPrograms(): Observable<Array<ExamProgram>> {
        return this.httpService.get<Array<ExamProgram>>(`/programs`)
            .pipe(map(valid => valid))
    }


}
