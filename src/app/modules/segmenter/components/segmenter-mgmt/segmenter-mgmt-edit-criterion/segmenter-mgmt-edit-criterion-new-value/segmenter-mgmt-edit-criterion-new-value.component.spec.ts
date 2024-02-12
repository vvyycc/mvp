import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterMgmtEditCriterionNewValueComponent } from './segmenter-mgmt-edit-criterion-new-value.component';

describe('SegmenterMgmtEditCriterionNewValueComponent', () => {
  let component: SegmenterMgmtEditCriterionNewValueComponent;
  let fixture: ComponentFixture<SegmenterMgmtEditCriterionNewValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterMgmtEditCriterionNewValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterMgmtEditCriterionNewValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
