import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VipQueueComponent } from './vip-queue.component';

describe('VipQueueComponent', () => {
  let component: VipQueueComponent;
  let fixture: ComponentFixture<VipQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
