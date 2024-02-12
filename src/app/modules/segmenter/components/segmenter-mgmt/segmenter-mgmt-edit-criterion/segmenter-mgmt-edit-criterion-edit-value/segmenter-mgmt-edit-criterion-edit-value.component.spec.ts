import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterMgmtEditCriterionEditValueComponent } from './segmenter-mgmt-edit-criterion-edit-value.component';

describe('SegmenterMgmtEditCriterionEditValueComponent', () => {
  let component: SegmenterMgmtEditCriterionEditValueComponent;
  let fixture: ComponentFixture<SegmenterMgmtEditCriterionEditValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterMgmtEditCriterionEditValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterMgmtEditCriterionEditValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
