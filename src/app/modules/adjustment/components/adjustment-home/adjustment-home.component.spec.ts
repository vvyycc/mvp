import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentHomeComponent } from './adjustment-home.component';

describe('AdjustmentHomeComponent', () => {
  let component: AdjustmentHomeComponent;
  let fixture: ComponentFixture<AdjustmentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustmentHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
