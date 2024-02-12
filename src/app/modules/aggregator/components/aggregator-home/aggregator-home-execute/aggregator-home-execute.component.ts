import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AggregatorService} from '../../../service/aggregator.service';
import {AggBankEntity} from '../../../model/agg-bank-entity';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {AggCriteria, AggExecution, AggTypology} from '../../../model/agg-execution';
import {formatDate} from '@angular/common';
import {Subject} from 'rxjs';
import {AggregateCriteria} from '../../../model/aggregate-criteria';
import {MatSelectionList} from '@angular/material/list';
import {MatCheckbox} from '@angular/material/checkbox';
import {NotificationService} from '../../../../../core/service/notification.service';

export function validateIfTypology(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tipologias = control.get('tipologias').value;
    const comercial = control.get('comercial').value;
    const tesoreria = control.get('tesoreria').value;

    if (tipologias.length === 2 && (comercial.length === 0 || tesoreria.length === 0)) {
      return {required: true};
    }
    if ((tipologias[0] === 'COMERCIAL' && comercial.length === 0) ||
      (tipologias[0] === 'TESORERIA' && tesoreria.length === 0)) {
      return {required: true};
    }

    return null;
  };
}

@Component({
  selector: 'app-aggregator-home-execute',
  templateUrl: './aggregator-home-execute.component.html',
  styleUrls: ['./aggregator-home-execute.component.css']
})
export class AggregatorHomeExecuteComponent implements OnInit {
  @ViewChild('selectTypology') private readonly typologySelect: MatSelect;
  allTypologySelected = false;
  allBankSelected = false;
  allPeriodSelected = false;
  @ViewChild('com') private readonly comSelectionList: MatSelectionList;
  @ViewChild('tes') private readonly tesSelectionList: MatSelectionList;
  typologyView = false;
  executionSubscriber: Subject<any>;

  entities: AggBankEntity[] = [];
  typologies: string[] = ['COMERCIAL', 'TESORERIA'];
  periods: string[] = ['D', 'M'];
  purposes: string[] = ['CALIDAD', 'LIQUIDEZ', 'INTERES', 'REGULATORIO'];
  execAggForm: FormGroup;
  comAggregates: AggregateCriteria[] = [];
  tesAggregates: AggregateCriteria[] = [];

  comercialText: string;
  comercialCount = 0;
  tesoreriaText: string;
  tesoreriaCount = 0;

  constructor(private fb: FormBuilder,
              private readonly aggService: AggregatorService,
              private readonly notificationService: NotificationService) {
    this.execAggForm = this.fb.group({
      fechaDato: ['', Validators.required],
      tipologias: ['', Validators.required],
      entidades: ['', Validators.required],
      periodicidades: ['', Validators.required],
      finalidad: ['', Validators.required],
      comercial: [''],
      tesoreria: ['']
    }, {
      validators: validateIfTypology()
    });
  }

  ngOnInit(): void {
    this.getBankEntities();
    this.getTypologies();
  }

  private getBankEntities(): void {
    this.aggService.bankEntities()
      .subscribe(response => this.entities = response);
  }

  private getTypologies(): void {
    this.aggService.aggregationsByTypology('COMERCIAL').subscribe(response => this.comAggregates = response);
    this.aggService.aggregationsByTypology('TESORERIA').subscribe(response => this.tesAggregates = response);
  }

  execute(): void {
    const exec: AggExecution = new AggExecution();
    const date = new Date(this.execAggForm.get('fechaDato').value);
    const comCriteria: Array<AggCriteria> = new Array<AggCriteria>();
    const tesCriteria: Array<AggCriteria> = new Array<AggCriteria>();

    if (this.comSelectionList) {
      this.execAggForm.get('comercial').value.forEach((c: AggCriteria) => {
        comCriteria.push({nombre: c.nombre, version: c.version});
      });
    }
    if (this.tesSelectionList) {
      this.execAggForm.get('tesoreria').value.forEach((c: AggCriteria) => {
        tesCriteria.push({nombre: c.nombre, version: c.version});
      });
    }

    exec.fechaDato = formatDate(date, 'yyyyMMdd', 'en_EN');
    exec.tipologias = new Array<AggTypology>();
    this.execAggForm.get('tipologias').value.forEach(t => {
      exec.tipologias.push({tipologia: t, criterios: (t === 'COMERCIAL') ? comCriteria : tesCriteria});
    });
    exec.entidades = this.execAggForm.get('entidades').value;
    exec.periodicidades = this.execAggForm.get('periodicidades').value;
    exec.finalidad = this.execAggForm.get('finalidad').value;


    this.aggService.execute(exec).subscribe(
      response => {
        this.notificationService.showNotification('Execution have been successfully', 'success');
      },
      error => {
        this.notificationService.showNotification(error.message, 'error');
      });
  }

  toggleAllTypology(select: MatSelect, checkbox: MatCheckbox): void {
    if (checkbox.checked) {
      select.options.forEach((item: MatOption) => item.select());
    } else {
      select.options.forEach((item: MatOption) => {
        item.deselect();
        this.clearAndReset(item.value);
      });
    }
  }

  toggleOneTypology(select: MatSelect): void {
    this.allTypologySelected = this.allSelected(select);
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

  showTypologyViews(): void {
    const typos = this.execAggForm.get('tipologias').value;
    this.typologyView = typos.length > 0;
  }

  updateDescription(typo: 'COMERCIAL' | 'TESORERIA', list: MatSelectionList): void {
    if (typo === 'COMERCIAL') {
      this.comercialText = list.selectedOptions.selected[0]?.value.nombre;
      this.comercialCount = list.selectedOptions.selected.length;
    }
    if (typo === 'TESORERIA') {
      this.tesoreriaText = list.selectedOptions.selected[0]?.value.nombre;
      this.tesoreriaCount = list.selectedOptions.selected.length;
    }
  }

  private clearAndReset(typo: 'COMERCIAL' | 'TESORERIA'): void {
    if (typo === 'COMERCIAL') {
      if (this.comSelectionList) {
        this.comSelectionList.deselectAll();
        this.comercialText = this.comSelectionList.selectedOptions.selected[0]?.value.nombre;
        this.comercialCount = this.comSelectionList.selectedOptions.selected.length;
      }
    }
    if (typo === 'TESORERIA') {
      if (this.tesSelectionList) {
        this.tesSelectionList.deselectAll();
        this.tesoreriaText = this.tesSelectionList.selectedOptions.selected[0]?.value.nombre;
        this.tesoreriaCount = this.tesSelectionList.selectedOptions.selected.length;
      }
    }
  }

  private allSelected(select: MatSelect): boolean {
    let selected = true;
    select.options.forEach(item => {
      if (!item.selected) {
        this.clearAndReset(item.value);
        selected = false;
      }
    });
    return selected;
  }
}
