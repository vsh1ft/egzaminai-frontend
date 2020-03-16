import { ExamProgramModule } from '../exam-program.module'
import { ComponentRegistryService } from '../../../../../service/registry/component-registry.service'
import { ExamProgramComponent } from '../exam-program.component'
/* tslint:disable:no-unused-expression */
describe(`${ExamProgramModule.name}`, () => {

    it('stores component into the registry', () => {
        const service = new ComponentRegistryService()

        new ExamProgramModule(service)

        expect(service.get('examPrograms')).toEqual(ExamProgramComponent)
    })

})
