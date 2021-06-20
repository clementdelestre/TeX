import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { VideoDetailsMovie, VideoDetailsTVShow } from '../models/kodiInterfaces/video';
import { AppNotification, AppNotificationType } from '../models/notification';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  volume: number = 0;
  muted: boolean = false;

  openRemote: boolean = false;
  showPlayer: boolean = false;
  
  openMovieDetails: VideoDetailsMovie | undefined;
  openTVShowDetails: VideoDetailsTVShow | undefined;

  notifications: Map<number, AppNotification> = new Map<number, AppNotification>();

  musicsDefaultPlayer: string;

  constructor( @Inject(DOCUMENT) private document: Document, private localStorage: LocalStorageService) {
    this.musicsDefaultPlayer = localStorage.getData("musicsDefaultPlayer") ?? "internal";
  }

  toggleBodyScroll(scroll: boolean){
    if(scroll){
      this.document.body.style.overflow = "overlay";
    } else {
      this.document.body.style.overflow = "hidden";
    }
  }

  historyPush(desc= "modal state"){

    if(history.state?.desc == desc) return;
    
    const modalState = {
      modal : true,
      desc : desc
    };
    history.pushState(modalState, "modal");
  }

  historyBack(){
    history.back()
  }

  blurActive(){
    var activeElement = (document.activeElement as HTMLElement);
    if (activeElement) {
      activeElement.blur();
    }
  }

  showNotification(title: string, body: string, type: AppNotificationType){
    const id = Math.random();
    this.notifications.set(id, {title: title, body: body, type: type})
    setTimeout(() => this.hideNotification(id), 5000);
  }

  hideNotification(id: number){
    this.notifications.delete(id);
  }

}
