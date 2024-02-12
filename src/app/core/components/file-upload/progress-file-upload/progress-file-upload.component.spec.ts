import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressFileUploadComponent } from './progress-file-upload.component';

describe('ProgressFileUploadComponent', () => {
  let component: ProgressFileUploadComponent;
  let fixture: ComponentFixture<ProgressFileUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressFileUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
