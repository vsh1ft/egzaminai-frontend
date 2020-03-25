import { Subject } from './subject'

export class ExamProgram {
    constructor(
        public id: string,
        public name: string,
        public subject: Subject,
        public programUrl: string
    ) {
    }

}
