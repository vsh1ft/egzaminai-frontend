import { ExamDateModule } from '../exam-date.module'
import { ComponentRegistryService } from '../../../../../service/registry/component-registry.service'
import { ExamDateComponent } from '../exam-date.component'
/* tslint:disable:no-unused-expression */
describe(`${ExamDateModule.name}`, () => {

    it('stores component into the registry', () => {
        const service = new ComponentRegistryService()

        new ExamDateModule(service)

        expect(service.get('examDates')).toEqual(ExamDateComponent)
    })

})
