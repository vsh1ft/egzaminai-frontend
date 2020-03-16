import { Injectable } from '@angular/core'
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators'
import { Exam } from '../home/dashboard/maturity-exam/exam-list/exam'

// array in local storage for registered users
let users = [{email: 'admin@a', password: 'admin', id: 0}]

/* tslint:disable */
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const {url, method, headers, body} = request

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(10))
            .pipe(dematerialize())

        function handleRoute() {
            console.log(url)
            switch (true) {
                case url.endsWith('/user/authenticate') && method === 'POST':
                    return authenticate()
                case url.endsWith('/user/exist') && method === 'POST':
                    return isValid()
                case url.endsWith('/user/create') && method === 'POST':
                    return register()
                case url.endsWith('/user/reset-password') && method === 'POST':
                    return resetPassword()
                case url.endsWith('/exams') && method === 'GET':
                    return ok(ELEMENT_DATA)
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser()
                default:
                    // pass through any requests not handled above
                    return next.handle(request)
            }
        }

        // route functions

        function authenticate() {
            const {email, password} = body
            const user = users.find(x => x.email === email && x.password === password)
            console.log('auths')
            if (!user) return error('Username or password is incorrect')
            return ok(
                'fake-jwt-token'
            )
        }

        function isValid() {
            const {email, password} = body
            const user = users.find(x => x.email === email && x.password === password)
            console.log('validates')
            if (!user) return ok(false)
            return ok(true)
        }

        function register() {
            console.log('registers')
            return ok('fake-jwt-token')
        }

        function resetPassword() {
            console.log('reset password')
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
            return of(new HttpResponse({status: 200, body}))
        }

        function error(message) {
            return throwError({error: {message}})
        }

        function unauthorized() {
            return throwError({status: 401, error: {message: 'Unauthorised'}})
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
const ELEMENT_DATA: Exam[] = [
    new Exam('Matematika', 2018, 'VBE', 'someUrl', 'answUrl'),
    new Exam('Užsienio kalba (anglų)', 2017, 'VBE', 'someUrl', 'answUrl'),
    new Exam('Lietuvių kalba ir literatūra', 2016, 'VBE', 'someUrl', 'answUrl'),
    new Exam('Istorija', 2015, 'VBE', 'someUrl', 'answUrl'),
    new Exam('Istorija', 2015, 'VBE', 'someUrl', 'answUrl'),
    new Exam('Istorija', 2015, 'VBE', 'someUrl', 'answUrl'),
    new Exam('Istorija', 2015, 'VBE', 'someUrl', 'answUrl'),
    new Exam('Istorija', 2015, 'VBE', 'someUrl', 'answUrl'),

    new Exam('Muzikos istorijos ir teorijos testas', 2014, 'VBE', 'someUrl', 'answUrl'),
    new Exam('Fizika', 2013, 'VBE', 'someUrl', 'answUrl'),
    new Exam('Fizika', 2013, 'VBE', 'someUrl', 'answUrl')

]
