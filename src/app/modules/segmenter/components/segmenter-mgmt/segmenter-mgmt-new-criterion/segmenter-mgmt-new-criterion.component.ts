import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SegmenterService} from '../../../service/segmenter.service';
import {NotificationService} from '../../../../../core/service/notification.service';
import {Criteria} from '../../../../../shared/model/criteria';

@Component({
  selector: 'app-segmenter-mgmt-new-criterion',
  templateUrl: './segmenter-mgmt-new-criterion.component.html',
  styleUrls: ['./segmenter-mgmt-new-criterion.component.css']
})
export class SegmenterMgmtNewCriterionComponent implements OnInit {
  execForm: FormGroup;

  @Output() createEmitter = new EventEmitter();

  constructor(private fb: FormBuilder,
              private readonly segService: SegmenterService,
              private readonly notifier: NotificationService) {
    this.execForm = this.fb.group({
      tipologia: ['', Validators.required],
      nombre: ['', Validators.required],
      definicion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  create(): void {
    const criterion: Criteria = new Criteria();
    criterion.tipologia = this.execForm.get('tipologia').value;
    criterion.nombre = this.execForm.get('nombre').value;
    criterion.definicion = this.execForm.get('definicion').value;

    this.segService.createCriterion(criterion)
      .subscribe(response => {
        if (response) {
          this.createEmitter.emit(response);
          this.notifier.showNotification('Criterion have been create successfully', 'success');
        }
      });
  }
}
