import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QTransComponent } from './q-trans.component';

describe('QTransComponent', () => {
  let component: QTransComponent;
  let fixture: ComponentFixture<QTransComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QTransComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
