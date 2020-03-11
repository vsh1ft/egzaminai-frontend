import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ForgotPasswordComponent } from './forgot-password.component'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'
import { MatInputModule } from '@angular/material/input'


@NgModule({
    declarations: [ForgotPasswordComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterModule,
        MatInputModule
    ]
})
export class ForgotPasswordModule {
}
