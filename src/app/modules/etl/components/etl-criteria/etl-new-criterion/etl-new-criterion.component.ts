import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../../../../core/service/notification.service';
import {EtlService} from '../../../service/etl.service';

@Component({
  selector: 'app-etl-new-criterion',
  templateUrl: './etl-new-criterion.component.html',
  styleUrls: ['./etl-new-criterion.component.css']
})
export class EtlNewCriterionComponent implements OnInit {
  form: FormGroup;
  @Output() emitter = new EventEmitter();

  constructor(private fb: FormBuilder,
              private readonly notifier: NotificationService,
              private readonly etlService: EtlService) {
    this.form = this.fb.group({
      tipologia: ['', Validators.required],
      nombre: ['', Validators.required],
      definicion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  create(): void {
    this.etlService.createCriterion(this.form.value)
      .subscribe(response => {
        if (response) {
          this.emitter.emit(response);
          this.notifier.showNotification('Criterion have been create successfully', 'success');
        }
      });
  }
}
