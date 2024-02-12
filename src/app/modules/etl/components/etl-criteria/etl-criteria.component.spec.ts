import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlCriteriaComponent } from './etl-criteria.component';

describe('EtlCriteriaComponent', () => {
  let component: EtlCriteriaComponent;
  let fixture: ComponentFixture<EtlCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtlCriteriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
