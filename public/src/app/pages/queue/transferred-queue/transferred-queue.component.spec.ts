import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferredQueueComponent } from './transferred-queue.component';

describe('TransferredQueueComponent', () => {
  let component: TransferredQueueComponent;
  let fixture: ComponentFixture<TransferredQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferredQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferredQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
