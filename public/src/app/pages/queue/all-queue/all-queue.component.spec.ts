import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllQueueComponent } from './all-queue.component';

describe('AllQueueComponent', () => {
  let component: AllQueueComponent;
  let fixture: ComponentFixture<AllQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
