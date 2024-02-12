import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlMappingsComponent } from './etl-mappings.component';

describe('EtlMappingsComponent', () => {
  let component: EtlMappingsComponent;
  let fixture: ComponentFixture<EtlMappingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtlMappingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlMappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
