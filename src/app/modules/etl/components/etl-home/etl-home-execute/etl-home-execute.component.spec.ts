import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlHomeExecuteComponent } from './etl-home-execute.component';

describe('EtlHomeExecuteComponent', () => {
  let component: EtlHomeExecuteComponent;
  let fixture: ComponentFixture<EtlHomeExecuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtlHomeExecuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlHomeExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
