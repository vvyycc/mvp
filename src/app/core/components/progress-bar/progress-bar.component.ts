import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressBarService} from '../../service/progress-bar.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {
  visible: Subject<boolean>;

  constructor(private progressBarService: ProgressBarService) {
  }

  ngOnInit(): void {
    this.visible = this.progressBarService.stream();
  }

  ngOnDestroy(): void {
    this.visible.unsubscribe();
  }
}
