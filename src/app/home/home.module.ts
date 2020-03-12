import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExamTabsModule } from '../exam-tabs/exam-tabs.module'
import { HomeComponent } from './home.component'

@NgModule({
    declarations: [HomeComponent],
    exports: [HomeComponent],
    imports: [
        CommonModule,
        ExamTabsModule
    ]
})
export class HomeModule {
}
