import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PuppExamListComponent } from './pupp-exam-list.component'

@NgModule({
    declarations: [PuppExamListComponent],
    exports: [PuppExamListComponent],
    imports: [
        CommonModule
    ]
})
export class PuppExamListModule {
}
