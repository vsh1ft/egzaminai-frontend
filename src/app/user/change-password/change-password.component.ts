import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { passwordMatchValidator } from '../sign-up/validator/password-validator'
import { UserAuthenticationService } from '../service/user-authentication/user-authentication.service'
import { ActivatedRoute, Router } from '@angular/router'
import { changePasswordText } from './change-password.constant'
import { routePaths } from 'src/app/router/app-routing.constant'
import { ChangePasswordForm } from './change-password-form'

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.html'
})
export class ChangePasswordComponent {

    changePasswordText = changePasswordText
    routePaths = routePaths
    isChangeEnabled = true

    passwordForm = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        repeatPassword: ['', [Validators.required]]
    }, {validators: passwordMatchValidator})

    constructor(private formBuilder: FormBuilder,
                private authService: UserAuthenticationService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    submit() {
        this.isChangeEnabled = false
        let token = ''
        this.route.queryParams.subscribe(params => {
            token = params.token
        })
        this.authService.changePassword(new ChangePasswordForm(token, this.passwordForm.controls.password.value))
            .subscribe(() => this.router.navigateByUrl(routePaths.login))
            .add(() => this.isChangeEnabled = true)
    }

}
