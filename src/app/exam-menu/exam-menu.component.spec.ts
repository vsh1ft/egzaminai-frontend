import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMenuComponent } from './exam-menu.component';

describe('ExamMenuComponent', () => {
  let component: ExamMenuComponent;
  let fixture: ComponentFixture<ExamMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
