import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationComponent} from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  showNotification(message: string, type: 'error' | 'info' | 'success'): void {
    let icon;
    switch (type) {
      case 'error': icon = 'error'; break;
      case 'success': icon = 'check_circle'; break;
      case 'info': icon = 'info'; break;
      default: icon = '';
    }
    this.snackBar.openFromComponent(NotificationComponent, {
      data: {
        message,
        type,
        icon
      },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: type
    });
  }
}
