import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {MatSelectionList} from '@angular/material/list';
import {Subject} from 'rxjs';
import {BankEntity} from '../../../../../shared/model/bank-entity';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {NotificationService} from '../../../../../core/service/notification.service';
import {SegmenterService} from '../../../service/segmenter.service';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatOption} from '@angular/material/core';
import {SegCriteria, SegExecution, SegTypology} from '../../../model/seg-execution';
import {formatDate} from '@angular/common';
import {Criteria} from '../../../../../shared/model/criteria';

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
  selector: 'app-segmenter-home-execute',
  templateUrl: './segmenter-home-execute.component.html',
  styleUrls: ['./segmenter-home-execute.component.css']
})
export class SegmenterHomeExecuteComponent implements OnInit {
  @ViewChild('selectTypology') private readonly typologySelect: MatSelect;
  allTypologySelected = false;
  allBankSelected = false;
  allPeriodSelected = false;
  @ViewChild('com') private readonly comSelectionList: MatSelectionList;
  @ViewChild('tes') private readonly tesSelectionList: MatSelectionList;
  typologyView = false;
  executionSubscriber: Subject<any>;

  entities: BankEntity[] = [];
  typologies: string[] = ['COMERCIAL', 'TESORERIA'];
  periods: string[] = ['D', 'M'];
  execForm: FormGroup;
  comAggregates: Criteria[] = [];
  tesAggregates: Criteria[] = [];

  comercialText: string;
  comercialCount = 0;
  tesoreriaText: string;
  tesoreriaCount = 0;

  constructor(private fb: FormBuilder,
              private readonly segService: SegmenterService,
              private readonly notifier: NotificationService) {
    this.execForm = this.fb.group({
      fechaDato: ['', Validators.required],
      tipologias: ['', Validators.required],
      entidades: ['', Validators.required],
      periodicidades: ['', Validators.required],
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

  execute(): void {
    const exec: SegExecution = new SegExecution();
    const date = new Date(this.execForm.get('fechaDato').value);
    const comCriteria: Array<SegCriteria> = new Array<SegCriteria>();
    const tesCriteria: Array<SegCriteria> = new Array<SegCriteria>();

    if (this.comSelectionList) {
      this.execForm.get('comercial').value.forEach((c: SegCriteria) => {
        comCriteria.push({nombre: c.nombre, version: c.version});
      });
    }
    if (this.tesSelectionList) {
      this.execForm.get('tesoreria').value.forEach((c: SegCriteria) => {
        tesCriteria.push({nombre: c.nombre, version: c.version});
      });
    }

    exec.fechaDato = formatDate(date, 'yyyyMMdd', 'en_EN');
    exec.tipologias = new Array<SegTypology>();
    this.execForm.get('tipologias').value.forEach(t => {
      exec.tipologias.push({tipologia: t, criterios: (t === 'COMERCIAL') ? comCriteria : tesCriteria});
    });
    exec.entidades = this.execForm.get('entidades').value;
    exec.periodicidades = this.execForm.get('periodicidades').value;

    this.segService.execute(exec).subscribe(
      response => {
        this.notifier.showNotification('Execution have been successfully', 'success');
      },
      error => {
        this.notifier.showNotification(error.message, 'error');
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
    const typos = this.execForm.get('tipologias').value;
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

  private getBankEntities(): void {
    this.segService.bankEntities()
      .subscribe(response => this.entities = response);
  }

  private getTypologies(): void {
    this.segService.criteria().subscribe(response => {
      this.comAggregates = response.filter(criterion => criterion.tipologia === 'COMERCIAL');
      this.tesAggregates = response.filter(criterion => criterion.tipologia === 'TESORERIA');
    });
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
