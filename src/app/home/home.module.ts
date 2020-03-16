import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExamTabsModule } from './exam-tabs/exam-tabs.module'
import { HomeComponent } from './home.component'
import { ExamListModule } from './dashboard/maturity-exam/exam-list/exam-list.module'
import { ViewContainerWrapper } from './view-container-wrapper.directive'
import { ExamProgramModule } from './dashboard/maturity-exam/exam-programs/exam-program.module'

@NgModule({
    declarations: [HomeComponent, ViewContainerWrapper],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        ExamTabsModule,
        ExamListModule,
        ExamProgramModule
    ]
})
export class HomeModule {
}
