import { async, TestBed } from '@angular/core/testing'

import { ExamTabsComponent } from '../exam-tabs.component'

describe(`${ExamTabsComponent.name}`, () => {
    let component: ExamTabsComponent

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ExamTabsComponent]
        })
        component = TestBed.inject(ExamTabsComponent)
    }))

    it('emits name change event', () => {
        spyOn(component.componentName, 'emit')

        component.emitNameChangeEvent('name')

        expect(component.componentName.emit).toHaveBeenCalledWith('name')
    })

})
