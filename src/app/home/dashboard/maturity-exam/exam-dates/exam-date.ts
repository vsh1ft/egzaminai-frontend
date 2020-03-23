import { MaturityExam } from '../maturity-exam'
import { ExamType } from './exam-type'

export class ExamDate {
    constructor(
        public name: MaturityExam,
        public type: ExamType,
        public dateTime: any
    ) {
    }

}
