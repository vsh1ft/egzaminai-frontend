import { Injectable } from '@angular/core'

@Injectable()
export class SessionService {

    get(): string {
        return sessionStorage.getItem('token')
    }

    set(token: string) {
        sessionStorage.setItem('token', token)
    }

    clear() {
        sessionStorage.clear()
    }

}
