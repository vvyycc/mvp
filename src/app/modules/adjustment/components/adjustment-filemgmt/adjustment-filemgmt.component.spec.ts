import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustmentFilemgmtComponent } from './adjustment-filemgmt.component';

describe('AdjustmentFilemgmtComponent', () => {
  let component: AdjustmentFilemgmtComponent;
  let fixture: ComponentFixture<AdjustmentFilemgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjustmentFilemgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjustmentFilemgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
