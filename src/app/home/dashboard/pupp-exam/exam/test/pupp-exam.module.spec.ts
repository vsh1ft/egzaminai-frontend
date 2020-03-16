import { PuppExamModule } from '../pupp-exam.module'
import { ComponentRegistryService } from '../../../../../service/registry/component-registry.service'
import { PuppExamComponent } from '../pupp-exam.component'
/* tslint:disable:no-unused-expression */
describe(`${PuppExamModule.name}`, () => {

    it('stores component into the registry', () => {
        const service = new ComponentRegistryService()

        new PuppExamModule(service)

        expect(service.get('puppExamList')).toEqual(PuppExamComponent)
    })

})
