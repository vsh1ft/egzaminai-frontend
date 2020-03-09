import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { loginText } from './login.constant'

@Component({
    selector: 'login',
    templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
    loginText = loginText

    email = new FormControl('')
    password = new FormControl('')

    constructor() {
    }

    ngOnInit(): void {
    }

}
