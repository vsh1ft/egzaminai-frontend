import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChangePasswordComponent } from './change-password.component'
import { MatCardModule } from '@angular/material/card'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'


@NgModule({
    declarations: [ChangePasswordComponent],
    imports: [
        CommonModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        RouterModule
    ]
})
export class ChangePasswordModule {
}
