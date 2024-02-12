import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterHomeDetailComponent } from './segmenter-home-detail.component';

describe('SegmenterHomeDetailComponent', () => {
  let component: SegmenterHomeDetailComponent;
  let fixture: ComponentFixture<SegmenterHomeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterHomeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterHomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
