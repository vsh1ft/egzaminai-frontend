import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExamTabsComponent } from './exam-tabs.component'
import { PuppExamListModule } from './pupp-exam-list/pupp-exam-list.module'
import { MaturityExamListModule } from './maturity-exam-list/maturity-exam-list.module'
import { PuppExamListComponent } from './pupp-exam-list/pupp-exam-list.component'

@NgModule({
    declarations: [ExamTabsComponent],
    exports: [
        ExamTabsComponent
    ],
    imports: [
        CommonModule,
        PuppExamListModule,
        MaturityExamListModule
    ]
})
export class ExamTabsModule {
}
