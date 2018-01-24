import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldQueueComponent } from './hold-queue.component';

describe('HoldQueueComponent', () => {
  let component: HoldQueueComponent;
  let fixture: ComponentFixture<HoldQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
