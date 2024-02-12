import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlHomeComponent } from './etl-home.component';

describe('AtlHomeComponent', () => {
  let component: EtlHomeComponent;
  let fixture: ComponentFixture<EtlHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtlHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
