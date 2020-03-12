import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MaturityExamListComponent } from './maturity-exam-list.component'

@NgModule({
    declarations: [MaturityExamListComponent],
    exports: [
        MaturityExamListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class MaturityExamListModule {
}
