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
import { AuthGuard } from './router/guard/auth.guard'
import { SessionService } from './service/session/session.service'
import { SignUpModule } from './user/sign-up/sign-up.module'
import { ForgotPasswordModule } from './user/forgot-password/forgot-password.module'
import { SnackbarService } from './service/snackbar/snackbar.service'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HomeModule } from './home/home.module'
import { ComponentRegistryService } from './service/registry/component-registry.service'
import { JwtInterceptor } from './interceptor/jwt/jwt-interceptor'
import { CrudService } from './service/crud/crud.service'
import { ChangePasswordModule } from './user/change-password/change-password.module'

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LoginModule,
        SignUpModule,
        HttpClientModule,
        ForgotPasswordModule,
        MatSnackBarModule,
        HomeModule,
        ChangePasswordModule
    ],
    providers: [
        UserAuthenticationService,
        ObservableHttpService,
        SessionService,
        AuthGuard,
        SnackbarService,
        CrudService,
        ComponentRegistryService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
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
