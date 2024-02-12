import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterMgmtNewCriterionComponent } from './segmenter-mgmt-new-criterion.component';

describe('SegmenterMgmtNewCriterionComponent', () => {
  let component: SegmenterMgmtNewCriterionComponent;
  let fixture: ComponentFixture<SegmenterMgmtNewCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterMgmtNewCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterMgmtNewCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
