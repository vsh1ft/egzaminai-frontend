import { Component } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { signUpText } from './sign-up.constant'
import { routePaths } from '../../router/app-routing.constant'
import { passwordMatchValidator } from './validator/password-validator'
import { Credentials } from '../login/credentials'
import { iif, MonoTypeOperatorFunction, OperatorFunction } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'
import { UserAuthenticationService } from '../service/user-authentication/user-authentication.service'
import { Router } from '@angular/router'

@Component({
    selector: 'sign-up',
    templateUrl: './sign-up.html'
})
export class SignUpComponent {
    signUpText = signUpText
    routePaths = routePaths
    isSignUpEnabled = true

    userForm = this.formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
            passwordForm: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(4)]],
                repeatPassword: ['', [Validators.required]]
            }, {validators: passwordMatchValidator})
        }
    )

    constructor(private formBuilder: FormBuilder,
                private authService: UserAuthenticationService,
                private router: Router) {
    }

    submit() {
        this.isSignUpEnabled = false

        this.authService.doesExist(this.userForm.controls.email.value)
            .pipe(
                this.setErrorWhenUserExists(),
                this.loginOnValidUser()
            )
            .subscribe(() => this.router.navigateByUrl(routePaths.home))
            .add(() => this.isSignUpEnabled = true)
    }

    private setErrorWhenUserExists(): MonoTypeOperatorFunction<boolean> {
        return tap(doesExist => {
            if (doesExist)
                this.userForm.controls.email.setErrors({emailTaken: 'true'})
        })
    }

    private loginOnValidUser(): OperatorFunction<boolean, void> {
        return switchMap((doesExist) =>
            iif(() => !doesExist, this.authService.create(
                new Credentials(this.userForm.controls.email.value, this.userForm.controls.passwordForm.get('password').value))
            )
        )
    }

}
