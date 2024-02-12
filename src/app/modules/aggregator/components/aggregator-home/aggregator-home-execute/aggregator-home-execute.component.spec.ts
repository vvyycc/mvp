import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggregatorHomeExecuteComponent } from './aggregator-home-execute.component';

describe('AggregatorHomeExecuteComponent', () => {
  let component: AggregatorHomeExecuteComponent;
  let fixture: ComponentFixture<AggregatorHomeExecuteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggregatorHomeExecuteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggregatorHomeExecuteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
