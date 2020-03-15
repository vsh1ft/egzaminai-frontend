import { Component } from '@angular/core'
import { examTabsText } from './exam.constant'

@Component({
    selector: 'exam-tabs',
    templateUrl: './exam-tabs.html'
})
export class ExamTabsComponent {
    examTabsText = examTabsText
}
