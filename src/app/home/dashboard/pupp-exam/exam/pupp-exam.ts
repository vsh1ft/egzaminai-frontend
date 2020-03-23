import { PuppExamName } from '../pupp-exam-name'

export class PuppExam {
    constructor(
        public name: PuppExamName,
        public year: number,
        public examUrl: string
    ) {
    }

}
