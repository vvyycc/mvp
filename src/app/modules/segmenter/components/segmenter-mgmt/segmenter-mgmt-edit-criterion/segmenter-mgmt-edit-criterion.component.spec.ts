import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterMgmtEditCriterionComponent } from './segmenter-mgmt-edit-criterion.component';

describe('SegmenterMgmtEditCriterionComponent', () => {
  let component: SegmenterMgmtEditCriterionComponent;
  let fixture: ComponentFixture<SegmenterMgmtEditCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterMgmtEditCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterMgmtEditCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
