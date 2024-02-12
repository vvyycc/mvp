import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorMgmtUploadCriterionComponent } from './aggregator-mgmt-upload-criterion.component';

describe('AggregatorMgmtUploadCriterionComponent', () => {
  let component: AggregatorMgmtUploadCriterionComponent;
  let fixture: ComponentFixture<AggregatorMgmtUploadCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorMgmtUploadCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorMgmtUploadCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
