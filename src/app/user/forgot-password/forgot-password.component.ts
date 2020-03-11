import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { forgotPasswordText } from './forgot-password.constant'
import { routePaths } from '../../router/app-routing.constant'
import { SnackbarService } from '../../service/snackbar/snackbar.service'
import { UserAuthenticationService } from '../service/user-authentication/user-authentication.service'
import { first } from 'rxjs/operators'

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.html'
})
export class ForgotPasswordComponent {
    forgotPasswordText = forgotPasswordText
    routePaths = routePaths

    isResetEnabled = true
    email = new FormControl('')

    constructor(private snackbarService: SnackbarService,
                private authService: UserAuthenticationService) {
    }

    submit() {
        this.isResetEnabled = false

        this.authService.resetPassword(this.email.value)
            .pipe(first())
            .subscribe(() => this.snackbarService.showSuccess(forgotPasswordText.checkEmail))
            .add(() => this.isResetEnabled = true)
    }

}
