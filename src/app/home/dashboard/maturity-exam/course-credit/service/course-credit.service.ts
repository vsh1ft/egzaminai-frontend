import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ObservableHttpService } from '../../../../../service/http-service/observable-http.service'
import { CourseCredit } from '../course-credit'

@Injectable()
export class CourseCreditService {
    constructor(private httpService: ObservableHttpService) {
    }

    getCredits(): Observable<Array<CourseCredit>> {
        return this.httpService.get<Array<CourseCredit>>(`/credits`)
            .pipe(map(valid => valid))
    }


}
