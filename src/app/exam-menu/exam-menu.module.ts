import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ExamMenuComponent } from './exam-menu.component'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatListModule } from '@angular/material/list'



@NgModule({
    declarations: [ExamMenuComponent],
    exports: [
        ExamMenuComponent
    ],
    imports: [
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        MatListModule
    ]
})
export class ExamMenuModule { }
