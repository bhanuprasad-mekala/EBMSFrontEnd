import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateBillComponent } from './calculate-bill.component';

describe('CalculateBillComponent', () => {
  let component: CalculateBillComponent;
  let fixture: ComponentFixture<CalculateBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculateBillComponent]
    });
    fixture = TestBed.createComponent(CalculateBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
