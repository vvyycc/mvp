import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlUploadCriterionComponent } from './etl-upload-criterion.component';

describe('EtlUploadCriterionComponent', () => {
  let component: EtlUploadCriterionComponent;
  let fixture: ComponentFixture<EtlUploadCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtlUploadCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlUploadCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
