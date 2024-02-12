import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlNewCriterionComponent } from './etl-new-criterion.component';

describe('EtlNewCriterionComponent', () => {
  let component: EtlNewCriterionComponent;
  let fixture: ComponentFixture<EtlNewCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtlNewCriterionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlNewCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
