import { ComponentRegistryService } from './component-registry.service'

describe(`${ComponentRegistryService.name}`, () => {

    it('stores component', () => {
        const service = new ComponentRegistryService()

        service.set('dummy', DummyComponent)

        expect(DummyComponent).toEqual(service.get('dummy'))
    })

    class DummyComponent {
    }
})
