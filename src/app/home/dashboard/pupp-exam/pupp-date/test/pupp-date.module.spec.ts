import { PuppDateModule } from '../pupp-date.module'
import { ComponentRegistryService } from '../../../../../service/registry/component-registry.service'
import { PuppDateComponent } from '../pupp-date.component'
/* tslint:disable:no-unused-expression */
describe(`${PuppDateModule.name}`, () => {

    it('stores component into the registry', () => {
        const service = new ComponentRegistryService()

        new PuppDateModule(service)

        expect(service.get('puppExamDates')).toEqual(PuppDateComponent)
    })

})
