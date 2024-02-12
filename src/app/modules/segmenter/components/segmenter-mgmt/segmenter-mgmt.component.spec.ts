import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterMgmtComponent } from './segmenter-mgmt.component';

describe('SegmenterMgmtComponent', () => {
  let component: SegmenterMgmtComponent;
  let fixture: ComponentFixture<SegmenterMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterMgmtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
