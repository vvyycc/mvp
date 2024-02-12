import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterComponent } from './segmenter.component';

describe('SegmentatorComponent', () => {
  let component: SegmenterComponent;
  let fixture: ComponentFixture<SegmenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
