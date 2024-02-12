import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Valor} from '../../../../../../shared/model/valor';
import {SegmenterService} from '../../../../service/segmenter.service';
import {NotificationService} from '../../../../../../core/service/notification.service';

@Component({
  selector: 'app-segmenter-mgmt-edit-criterion-edit-value',
  templateUrl: './segmenter-mgmt-edit-criterion-edit-value.component.html',
  styleUrls: ['./segmenter-mgmt-edit-criterion-edit-value.component.css']
})
export class SegmenterMgmtEditCriterionEditValueComponent implements OnInit {
  valor: Valor;
  name: string;
  form: FormGroup;
  @Output() emitter = new EventEmitter();

  constructor(private fb: FormBuilder,
              private readonly segService: SegmenterService,
              private readonly notifier: NotificationService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.valor = data.value;
    this.name = data.name;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      definicion: ['', Validators.required]
    });
    this.form.patchValue({
      nombre: this.valor.nombre,
      definicion: this.valor.definicion
    });
  }

  update(): void {
    const id = this.valor.id;
    const nombre = this.form.get('nombre').value;
    const definicion = this.form.get('definicion').value;
    const update: Valor = new Valor(id, nombre, definicion);
    this.segService.updateCriterionValue(this.name, update)
      .subscribe(response => {
        this.emitter.emit(response);
        this.notifier.showNotification(`Criterion value have been update successfully`, 'success');
      }, error => {
        this.notifier.showNotification(JSON.stringify(error.error.message), 'error');
      });
  }
}
