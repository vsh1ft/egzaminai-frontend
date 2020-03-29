import { async, TestBed } from '@angular/core/testing'

import { ExamMenuComponent } from '../exam-menu.component'

describe(`${ExamMenuComponent.name}`, () => {
    let component: ExamMenuComponent

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [ExamMenuComponent]
        })
        component = TestBed.inject(ExamMenuComponent)
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
