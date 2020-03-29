import { Component, EventEmitter, Output } from '@angular/core'
import { examMenuText } from './exam-menu.constant'

@Component({
    selector: 'exam-menu',
    templateUrl: './exam-menu.html'
})
export class ExamMenuComponent {
    examMenuTabs = examMenuText
    selectedListItem = 'examList'

    @Output() componentName = new EventEmitter<string>()

    constructor() {
    }

    selectItem(name: string) {
        this.componentName.emit(name)
        this.selectedListItem = name
    }

    isSelected(name: string): boolean {
        return this.selectedListItem === name
    }

}
