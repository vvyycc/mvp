import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AggregateCriteria} from '../../../model/aggregate-criteria';
import {AggregatorService} from '../../../service/aggregator.service';
import {NotificationService} from '../../../../../core/service/notification.service';

@Component({
  selector: 'app-aggregator-mgmt-new-criterion',
  templateUrl: './aggregator-mgmt-new-criterion.component.html',
  styleUrls: ['./aggregator-mgmt-new-criterion.component.css']
})
export class AggregatorMgmtNewCriterionComponent implements OnInit {
  form: FormGroup;
  @Output() emitter = new EventEmitter();

  constructor(private fb: FormBuilder,
              private readonly aggService: AggregatorService,
              private readonly notifier: NotificationService) {
    this.form = this.fb.group({
      tipologia: ['', Validators.required],
      nombre: ['', Validators.required],
      definicion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  create(): void {
    const criterion = new AggregateCriteria();
    criterion.nombre = this.form.get('nombre').value;
    criterion.definicion = this.form.get('definicion').value;
    criterion.tipologia = this.form.get('tipologia').value;

    this.aggService.createCriterion(criterion)
      .subscribe(response => {
        if (response) {
          this.emitter.emit(response);
          this.notifier.showNotification('Criterion have been create successfully', 'success');
        }
      });
  }

}
