import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExamTabsModule } from '../exam-tabs/exam-tabs.module'
import { HomeComponent } from './home.component'
import { ExamListModule } from '../exam-list/exam-list.module'

@NgModule({
    declarations: [HomeComponent],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        ExamTabsModule,
        ExamListModule
    ]
})
export class HomeModule {
}
