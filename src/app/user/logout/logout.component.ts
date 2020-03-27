import { Component } from '@angular/core'
import { ObservableHttpService } from '../../service/http-service/observable-http.service'
import { Router } from '@angular/router'
import { SessionService } from '../../service/session/session.service'
import { routePaths } from '../../router/app-routing.constant'

@Component({
    selector: 'logout',
    templateUrl: './logout.html'
})
export class LogoutComponent {

    constructor(private router: Router,
                private observableHttpService: ObservableHttpService,
                private sessionService: SessionService) {
    }

    logout() {
        this.observableHttpService.post('/user/logout').subscribe(() => {
            this.sessionService.clear()
            this.router.navigateByUrl(routePaths.login)
        })
    }
}
