import { PuppExamName } from '../pupp-exam-name'

export class PuppExam {
    constructor(
        public id: string,
        public name: PuppExamName,
        public year: number,
        public examUrl: string
    ) {
    }

}
