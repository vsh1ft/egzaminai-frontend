import { MaturityExam } from '../../maturity-exam'
import { ExamType } from '../../exam-dates/exam-type'

export class Exam {
    constructor(
        public id: string,
        public name: MaturityExam,
        public year: number,
        public type: ExamType,
        public examUrl: string,
        public answerUrl: string
    ) {
    }

}
