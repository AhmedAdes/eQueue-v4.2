import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveQueueComponent } from './active-queue.component';

describe('ActiveQueueComponent', () => {
  let component: ActiveQueueComponent;
  let fixture: ComponentFixture<ActiveQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
