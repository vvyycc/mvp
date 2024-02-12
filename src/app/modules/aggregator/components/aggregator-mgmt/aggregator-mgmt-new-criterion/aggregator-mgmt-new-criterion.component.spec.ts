import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorMgmtNewCriterionComponent } from './aggregator-mgmt-new-criterion.component';

describe('AggregatorMgmtNewCriterionComponent', () => {
  let component: AggregatorMgmtNewCriterionComponent;
  let fixture: ComponentFixture<AggregatorMgmtNewCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorMgmtNewCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorMgmtNewCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
