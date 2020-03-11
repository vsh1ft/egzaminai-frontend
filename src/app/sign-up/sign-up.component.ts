import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { signUpText } from './sign-up.constant'
import { routePaths } from '../router/app-routing.constant'

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.html',
    styleUrls: ['./sign-up.scss']
})
export class SignUpComponent implements OnInit {
    signUpText = signUpText
    routePaths = routePaths

    email = new FormControl('')

    constructor() {
    }

    ngOnInit(): void {
    }

}
