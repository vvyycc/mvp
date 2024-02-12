import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmenterHomeExecuteComponent } from './segmenter-home-execute.component';

describe('SegmenterHomeExecuteComponent', () => {
  let component: SegmenterHomeExecuteComponent;
  let fixture: ComponentFixture<SegmenterHomeExecuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmenterHomeExecuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmenterHomeExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
