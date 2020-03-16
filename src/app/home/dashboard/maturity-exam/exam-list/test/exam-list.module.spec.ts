import { ComponentRegistryService } from '../../../../../service/registry/component-registry.service'
import { ExamListModule } from '../exam-list.module'
import { ExamListComponent } from '../exam-list.component'
/* tslint:disable:no-unused-expression */
describe(`${ExamListModule.name}`, () => {

    it('stores component into the registry', () => {
        const service = new ComponentRegistryService()

        new ExamListModule(service)

        expect(service.get('examList')).toEqual(ExamListComponent)
    })

})
