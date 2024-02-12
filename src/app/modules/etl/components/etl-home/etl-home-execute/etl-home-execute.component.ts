import {Component, OnInit, ViewChild} from '@angular/core';
import {BankEntityService} from '../../../../../shared/services/bank-entity.service';
import {BankEntity} from '../../../../../shared/model/bank-entity';
import {MatOption} from '@angular/material/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {EtlExecution} from '../../../model/etl-execution';
import {formatDate} from '@angular/common';
import {EtlService} from '../../../service/etl.service';
import {Subject} from 'rxjs';
import {Criteria} from '../../../../../shared/model/criteria';
import {MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';

export function validateIfAggregate(a, t): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const aggregate = control.get(a).value;
    const typology = control.get(t).value;
    const criteria = control.get('criteria').value;

    if ((aggregate === 'NO' && typology) || (aggregate === 'SI' && typology && criteria)) {
      return null;
    }
    return {required: true};
  };
}

@Component({
  selector: 'app-etl-home-execute',
  templateUrl: './etl-home-execute.component.html',
  styleUrls: ['./etl-home-execute.component.css']
})
export class EtlHomeExecuteComponent implements OnInit {
  @ViewChild('allSelectedBankEntity') private readonly bankEntitiesSelect: MatOption;
  @ViewChild('allSelectedPeriod') private readonly periodSelect: MatOption;
  typologyView = new Subject<boolean>();
  executionSubscriber: Subject<any>;
  allBankSelected = false;
  allPeriodSelected = false;

  entities: BankEntity[] = [];
  aggregatesByCriteria: Criteria [] = [];
  aggregates: string[] = ['SI', 'NO'];
  periods: string[] = ['D', 'M'];
  typologies: string[] = ['COMERCIAL', 'TESORERIA'];
  purposes: string[] = ['CALIDAD', 'LIQUIDEZ', 'INTERES', 'REGULATORIO'];
  execEtlForm: FormGroup;

  constructor(private fb: FormBuilder,
              private readonly bankEntityService: BankEntityService,
              private readonly etlService: EtlService) {
    this.execEtlForm = this.fb.group({
      date: ['', Validators.required],
      aggregate: ['', Validators.required],
      typology: ['', Validators.required],
      entity: ['', Validators.required],
      period: ['', Validators.required],
      name: ['', Validators.required],
      purpose: ['', Validators.required],
      criteria: ['']
    }, {
      validators: validateIfAggregate('aggregate', 'typology')
    });
  }

  ngOnInit(): void {
    this.getBankEntities();
  }

  getBankEntities(): void {
    this.bankEntityService.getBankEntities()
      .subscribe(response => this.entities = response);
  }

  execute(): void {
    const etlExecution: EtlExecution = new EtlExecution();
    const date = new Date(this.execEtlForm.get('date').value);
    etlExecution.fechaDato = formatDate(date, 'yyyyMMdd', 'en_EN');
    etlExecution.agregado = this.execEtlForm.get('aggregate').value;
    etlExecution.tipologia = this.execEtlForm.get('typology').value;
    etlExecution.entidades = this.execEtlForm.get('entity').value;
    etlExecution.periodicidades = this.execEtlForm.get('period').value;
    etlExecution.nombre_etl = this.execEtlForm.get('name').value;
    etlExecution.finalidad = this.execEtlForm.get('purpose').value;
    etlExecution.criterio_agregacion = this.execEtlForm.get('criteria').value[0];

    this.etlService.executeEtl(etlExecution).subscribe((response: string[]) => {
      for (const res of response) {
        console.log(res);
        /*this.executionSubscriber = new Subject();
        this.executionObserver$ = interval(1000)
          .pipe(
            startWith(0),
            switchMap(() => this.etlService.executionHistory(res)));
        this.executionObserver$
          .pipe(takeUntil(this.executionSubscriber))
          .subscribe(exec => {
            if (exec === 'DONE' || exec === 'FAILED') {
              this.executionSubscriber.next();
              this.executionSubscriber.complete();
            }
          });*/
      }
    });
  }

  toggleOneBank(select: MatSelect): void {
    this.allBankSelected = this.allSelected(select);
  }

  toggleOnePeriod(select: MatSelect): void {
    this.allPeriodSelected = this.allSelected(select);
  }

  toggleAll(select: MatSelect, checkbox: MatCheckbox): void {
    if (checkbox.checked) {
      select.options.forEach((item: MatOption) => item.select());
    } else {
      select.options.forEach((item: MatOption) => item.deselect());
    }
  }

  showTypologyView(): void {
    const aggregate = this.execEtlForm.get('aggregate').value;
    const typology = this.execEtlForm.get('typology').value;
    this.execEtlForm.patchValue({criteria: ''});
    this.execEtlForm.get('criteria').updateValueAndValidity();

    if (aggregate === this.aggregates[0] && typology) {
      this.typologyView.next(true);
      this.etlService.aggregationsByTypology(typology)
        .subscribe(res => this.aggregatesByCriteria = res);
    } else {
      this.typologyView.next(false);
    }
  }

  private allSelected(select: MatSelect): boolean {
    let selected = true;
    select.options.forEach(item => {
      if (!item.selected) {
        selected = false;
      }
    });
    return selected;
  }
}
