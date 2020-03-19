import { Component, OnInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { loginText } from './login.constant'
import { UserAuthenticationService } from '../service/user-authentication/user-authentication.service'
import { switchMap, tap } from 'rxjs/operators'
import { Credentials } from './credentials'
import { Router } from '@angular/router'
import { SessionService } from '../../service/session/session.service'
import { routePaths } from '../../router/app-routing.constant'
import { iif, MonoTypeOperatorFunction, OperatorFunction } from 'rxjs'

@Component({
    selector: 'login',
    templateUrl: './login.html'
})
export class LoginComponent implements OnInit {
    loginText = loginText
    routePaths = routePaths
    isSignInEnabled = true

    email = new FormControl('')
    password = new FormControl('')

    constructor(private authService: UserAuthenticationService,
                private router: Router,
                private sessionService: SessionService) {
    }

    ngOnInit(): void {
        if (this.sessionService.get())
            this.router.navigateByUrl(routePaths.home)
    }

    submit() {
        this.isSignInEnabled = false

        this.authService.doesExist(this.email.value)
            .pipe(
                this.setErrorOnInvalidUser(),
                this.loginOnValidUser()
            )
            .subscribe(() => this.router.navigateByUrl(routePaths.home))
            .add(() => this.isSignInEnabled = true)
    }

    private setErrorOnInvalidUser(): MonoTypeOperatorFunction<boolean> {
        return tap(isValid => {
            if (!isValid && this.email.errors == null)
                this.email.setErrors({invalidUser: 'true'})
        })
    }

    private loginOnValidUser(): OperatorFunction<boolean, void> {
        return switchMap((isValid) =>
            iif(() => isValid, this.authService.login(new Credentials(this.email.value, this.password.value)))
        )
    }

}
