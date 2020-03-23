import { Subject } from './subject'

export class ExamProgram {
    constructor(
        public name: string,
        public subject: Subject,
        public programUrl: string
    ) {
    }

}
