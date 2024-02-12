import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorMgmtComponent } from './aggregator-mgmt.component';

describe('AggregatorMgmtComponent', () => {
  let component: AggregatorMgmtComponent;
  let fixture: ComponentFixture<AggregatorMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
