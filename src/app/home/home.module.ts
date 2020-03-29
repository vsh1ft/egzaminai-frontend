import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExamTabsModule } from './exam-tabs/exam-tabs.module'
import { HomeComponent } from './home.component'
import { ExamListModule } from './dashboard/maturity-exam/exam-list/exam-list.module'
import { ViewContainerWrapper } from './view-container-wrapper.directive'
import { ExamProgramModule } from './dashboard/maturity-exam/exam-programs/exam-program.module'
import { ExamDateModule } from './dashboard/maturity-exam/exam-dates/exam-date.module'
import { CourseCreditModule } from './dashboard/maturity-exam/course-credit/course-credit.module'
import { PuppExamModule } from './dashboard/pupp-exam/exam/pupp-exam.module'
import { PuppProgramModule } from './dashboard/pupp-exam/pupp-program/pupp-program.module'
import { PuppDateModule } from './dashboard/pupp-exam/pupp-date/pupp-date.module'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { LogoutModule } from '../user/logout/logout.module'
import { ExtendedModule, FlexModule } from '@angular/flex-layout'
import { ExamMenuModule } from '../exam-menu/exam-menu.module'

@NgModule({
    declarations: [HomeComponent, ViewContainerWrapper],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        ExamTabsModule,
        ExamListModule,
        ExamProgramModule,
        ExamDateModule,
        CourseCreditModule,
        PuppExamModule,
        PuppProgramModule,
        PuppDateModule,
        MatIconModule,
        MatButtonModule,
        LogoutModule,
        ExtendedModule,
        ExamMenuModule,
        FlexModule
    ]
})
export class HomeModule {
}
