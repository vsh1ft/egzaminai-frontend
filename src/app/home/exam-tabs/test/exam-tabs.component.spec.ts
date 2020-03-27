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

        component.selectItem('name')

        expect(component.componentName.emit).toHaveBeenCalledWith('name')
    })

    it('sets active list item name', () => {
        component.selectItem('name')

        expect(component.selectedListItem).toEqual('name')
    })

    it('confirms currently selected item', () => {
        expect(component.isSelected('examList')).toBeTruthy()
    })

    it('denies thar item is selected', () => {
        expect(component.isSelected('item')).toBeFalsy()
    })

})
