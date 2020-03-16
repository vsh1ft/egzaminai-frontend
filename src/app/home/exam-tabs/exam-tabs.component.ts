import { Component, EventEmitter, Output } from '@angular/core'
import { examTabsText } from './exam.constant'

@Component({
    selector: 'exam-tabs',
    templateUrl: './exam-tabs.html'
})
export class ExamTabsComponent {
    examTabsText = examTabsText

    @Output() componentName = new EventEmitter<string>()

    emitNameChangeEvent(name: string) {
        this.componentName.emit(name)
    }

}
