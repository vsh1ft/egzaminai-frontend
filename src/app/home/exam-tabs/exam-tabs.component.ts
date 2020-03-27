import { Component, EventEmitter, Output } from '@angular/core'
import { examTabsText } from './exam.constant'

@Component({
    selector: 'exam-tabs',
    templateUrl: './exam-tabs.html'
})
export class ExamTabsComponent {
    examTabsText = examTabsText
    selectedListItem = 'examList'

    @Output() componentName = new EventEmitter<string>()

    selectItem(name: string) {
        this.componentName.emit(name)
        this.selectedListItem = name
    }

    isSelected(name: string): boolean {
        return this.selectedListItem === name
    }

}
