import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterHomeComponent } from './segmenter-home.component';

describe('SegmenterHomeComponent', () => {
  let component: SegmenterHomeComponent;
  let fixture: ComponentFixture<SegmenterHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
