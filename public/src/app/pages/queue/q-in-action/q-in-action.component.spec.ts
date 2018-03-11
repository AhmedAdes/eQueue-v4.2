import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QInActionComponent } from './q-in-action.component';

describe('QInActionComponent', () => {
  let component: QInActionComponent;
  let fixture: ComponentFixture<QInActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QInActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QInActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
