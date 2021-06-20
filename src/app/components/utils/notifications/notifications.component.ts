import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { ApplicationService } from 'src/app/services/application.service';
import { AppNotification, AppNotificationType } from '../../../models/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('insertAnimation', [
      transition("void => true", [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
    ]),
  ]
})
export class NotificationsComponent implements OnInit {

  notifications: Map<number, AppNotification> = new Map<number, AppNotification>();

  constructor(public application: ApplicationService) { }

  ngOnInit(): void {

  }

  getNofificationType(type: AppNotificationType): string{
    switch(type){
      case AppNotificationType.success:
        return 'success';
      case AppNotificationType.error:
        return 'error';
      default:
        return '';
    }
  }

  hideNotification(id: number){
    this.notifications = this.application.notifications;
    this.notifications.delete(id);
    this.application.hideNotification(id);
  }

  regenerate(id: number): string {
    return !this.notifications.has(id) ? "true" : "false";
  }

}
