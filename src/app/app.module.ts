import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './router/app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { LoginModule } from './user/login/login.module'
import { UserAuthenticationService } from './user/service/user-authentication/user-authentication.service'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FakeBackendInterceptor } from './interceptor/fake-backend.interceptor'
import { ObservableHttpService } from './service/http-service/observable-http.service'
import { HttpErrorInterceptor } from './interceptor/http-error-interceptor'
import { HomeComponent } from './home/home.component'
import { AuthGuard } from './router/guard/auth.guard'
import { SessionService } from './service/session/session.service'
import { SignUpModule } from './user/sign-up/sign-up.module'
import { ForgotPasswordModule } from './user/forgot-password/forgot-password.module'
import { SnackbarService } from './service/snackbar/snackbar.service'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LoginModule,
        SignUpModule,
        HttpClientModule,
        ForgotPasswordModule,
        MatSnackBarModule
    ],
    providers: [
        UserAuthenticationService,
        ObservableHttpService,
        SessionService,
        AuthGuard,
        SnackbarService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: FakeBackendInterceptor,
            multi: true
        }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
