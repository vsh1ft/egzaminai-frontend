import { LoginComponent } from './login.component'
import { MatCardModule } from '@angular/material/card'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        RouterModule
    ],
    exports: [
        LoginComponent
    ]
})
export class LoginModule {
}
