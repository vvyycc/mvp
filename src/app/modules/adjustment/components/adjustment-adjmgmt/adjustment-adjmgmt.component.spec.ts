import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentAdjmgmtComponent } from './adjustment-adjmgmt.component';

describe('AdjustmentAdjmgmtComponent', () => {
  let component: AdjustmentAdjmgmtComponent;
  let fixture: ComponentFixture<AdjustmentAdjmgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustmentAdjmgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentAdjmgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
