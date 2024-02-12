import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterMgmtUploadCriterionComponent } from './segmenter-mgmt-upload-criterion.component';

describe('SegmenterMgmtUploadCriterionComponent', () => {
  let component: SegmenterMgmtUploadCriterionComponent;
  let fixture: ComponentFixture<SegmenterMgmtUploadCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterMgmtUploadCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterMgmtUploadCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
