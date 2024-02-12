import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @Output() confirm = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  accept(): void {
    this.confirm.emit(true);
  }
}
