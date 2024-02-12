import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
}
