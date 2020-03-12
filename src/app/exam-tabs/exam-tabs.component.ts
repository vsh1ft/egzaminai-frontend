import { Component, OnInit } from '@angular/core'
import { examTabsText } from './exam.constant'

@Component({
    selector: 'exam-tabs',
    templateUrl: './exam-tabs.html'
})
export class ExamTabsComponent implements OnInit {
    examTabsText = examTabsText

    constructor() {
    }

    ngOnInit(): void {
    }

}
