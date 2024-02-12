import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SegmenterService} from '../../../../service/segmenter.service';
import {NotificationService} from '../../../../../../core/service/notification.service';
import {Valor} from '../../../../../../shared/model/valor';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Criteria} from '../../../../../../shared/model/criteria';

@Component({
  selector: 'app-segmenter-mgmt-edit-criterion-new-value',
  templateUrl: './segmenter-mgmt-edit-criterion-new-value.component.html',
  styleUrls: ['./segmenter-mgmt-edit-criterion-new-value.component.css']
})
export class SegmenterMgmtEditCriterionNewValueComponent implements OnInit {
  criterion: Criteria;
  form: FormGroup;
  @Output() emitter = new EventEmitter();

  constructor(private fb: FormBuilder,
              private readonly segService: SegmenterService,
              private readonly notifier: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: Criteria) {
    this.criterion = data;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      definicion: ['', Validators.required]
    });
  }

  create(): void {
    const nombre = this.form.get('nombre').value;
    const definicion = this.form.get('definicion').value;
    const value: Valor = new Valor(null, nombre, definicion);

    this.segService.createCriterionValue(this.criterion.nombre, value)
      .subscribe(response => {
        this.emitter.emit(response);
        this.notifier.showNotification(`Criterion value: ${value.nombre} have been create successfully`, 'success');
      }, error => {
        this.notifier.showNotification(JSON.stringify(error.error.message), 'error');
      });
  }
}
