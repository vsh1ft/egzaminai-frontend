import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { PuppProgram } from '../pupp-program'

@Injectable()
export class PuppProgramService {
    constructor(private httpService: ObservableHttpService) {
    }

    getPrograms(): Observable<Array<PuppProgram>> {
        return this.httpService.get<Array<PuppProgram>>(`/pupp-programs`)
            .pipe(map(valid => valid))
    }


}
