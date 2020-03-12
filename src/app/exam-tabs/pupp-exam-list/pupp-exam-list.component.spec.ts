import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PuppExamListComponent } from './pupp-exam-list.component'

describe('PuppExamListComponent', () => {
    let component: PuppExamListComponent
    let fixture: ComponentFixture<PuppExamListComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PuppExamListComponent]
        })
            .compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(PuppExamListComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
