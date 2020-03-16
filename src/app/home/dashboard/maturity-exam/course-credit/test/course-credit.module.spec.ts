import { CourseCreditModule } from '../course-credit.module'
import { ComponentRegistryService } from '../../../../../service/registry/component-registry.service'
import { CourseCreditComponent } from '../course-credit.component'
/* tslint:disable:no-unused-expression */
describe(`${CourseCreditModule.name}`, () => {

    it('stores component into the registry', () => {
        const service = new ComponentRegistryService()

        new CourseCreditModule(service)

        expect(service.get('courseCredits')).toEqual(CourseCreditComponent)
    })

})
