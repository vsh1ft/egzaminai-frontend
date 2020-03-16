import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExamTabsModule } from './exam-tabs/exam-tabs.module'
import { HomeComponent } from './home.component'
import { ExamListModule } from './dashboard/maturity-exam/exam-list/exam-list.module'
import { ViewContainerWrapper } from './view-container-wrapper.directive'

@NgModule({
    declarations: [HomeComponent, ViewContainerWrapper],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        ExamTabsModule,
        ExamListModule
    ]
})
export class HomeModule {
}
