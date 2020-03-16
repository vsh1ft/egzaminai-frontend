import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExamTabsComponent } from './exam-tabs.component'
import { MatTabsModule } from '@angular/material/tabs'
import { MatListModule } from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
    declarations: [ExamTabsComponent],
    exports: [
        ExamTabsComponent
    ],
    imports: [
        CommonModule,
        MatTabsModule,
        MatListModule,
        MatButtonModule
    ]
})
export class ExamTabsModule {
}
