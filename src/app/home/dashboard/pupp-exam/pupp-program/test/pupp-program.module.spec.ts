import { PuppProgramModule } from '../pupp-program.module'
import { ComponentRegistryService } from '../../../../../service/registry/component-registry.service'
import { PuppProgramComponent } from '../pupp-program.component'
/* tslint:disable:no-unused-expression */
describe(`${PuppProgramModule.name}`, () => {

    it('stores component into the registry', () => {
        const service = new ComponentRegistryService()

        new PuppProgramModule(service)

        expect(service.get('puppExamPrograms')).toEqual(PuppProgramComponent)
    })

})
