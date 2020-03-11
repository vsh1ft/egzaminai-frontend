import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { forgotPasswordText } from './forgot-password.constant'
import { routePaths } from '../../router/app-routing.constant'

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent implements OnInit {
    forgotPasswordText = forgotPasswordText
    routePaths = routePaths

    email = new FormControl('')

    constructor() {
    }

    ngOnInit(): void {
    }

}
