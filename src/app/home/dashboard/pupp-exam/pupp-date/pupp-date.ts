import { PuppExamName } from '../pupp-exam-name'

export class PuppDate {
    constructor(
        public id: string,
        public name: PuppExamName,
        public dateTime: any
    ) {
    }

}
