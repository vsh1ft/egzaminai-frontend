import createSpy = jasmine.createSpy
import { SessionService } from './session.service'

describe(`${SessionService.name}`, () => {

    it('retrieves token', () => {
        const expectedToken = 'token'
        sessionStorage.getItem = createSpy('String').and.returnValue(expectedToken)

        const actualToken = new SessionService().get()

        expect(actualToken).toEqual(expectedToken)
    })

    it('stores token', () => {
        const expectedToken = 'token'
        sessionStorage.setItem = createSpy()

        new SessionService().set(expectedToken)

        expect(sessionStorage.setItem).toHaveBeenCalledWith('token', expectedToken)
    })

})
