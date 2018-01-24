import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueScheduleComponent } from './queue-schedule.component';

describe('QueueScheduleComponent', () => {
  let component: QueueScheduleComponent;
  let fixture: ComponentFixture<QueueScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueueScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
