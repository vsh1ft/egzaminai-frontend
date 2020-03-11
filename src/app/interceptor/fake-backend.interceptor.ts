import { Injectable } from '@angular/core'
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators'

// array in local storage for registered users
let users = [{email: 'admin', password: 'admin', id: 0}]
/* tslint:disable */
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(1000))
            .pipe(dematerialize())

        function handleRoute() {
            console.log(url)
            switch (true) {
                case url.endsWith('/user/authenticate') && method === 'POST':
                    return authenticate()
                case url.endsWith('/user/is-valid') && method === 'POST':
                    return isValid()
                case url.endsWith('/users/register') && method === 'POST':
                    return register()
                case url.endsWith('/users') && method === 'GET':
                    return getUsers()
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser()
                default:
                    // pass through any requests not handled above
                    return next.handle(request)
            }
        }

        // route functions

        function authenticate() {
            const { email, password } = body
            const user = users.find(x => x.email === email && x.password === password)
            console.log('auths')
            if (!user) return error('Username or password is incorrect')
            return ok(
                'fake-jwt-token'
            )
        }

        function isValid() {
            const { email, password } = body
            const user = users.find(x => x.email === email && x.password === password)
            console.log('validates')
            if (!user) return ok(false)
            return ok(true)
        }

        function register() {
            const user = body

            if (users.find(x => x.email === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1
            users.push(user)
            localStorage.setItem('users', JSON.stringify(users))

            return ok()
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized()
            return ok(users)
        }

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized()

            users = users.filter(x => x.id !== idFromUrl())
            localStorage.setItem('users', JSON.stringify(users))
            return ok()
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } })
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } })
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token'
        }

        function idFromUrl() {
            const urlParts = url.split('/')
            return parseInt(urlParts[urlParts.length - 1])
        }
    }
}
