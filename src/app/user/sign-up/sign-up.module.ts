import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SignUpComponent } from './sign-up.component'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [SignUpComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        RouterModule
    ]
})
export class SignUpModule {
}
