import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { VideoDetailsMovie, VideoDetailsTVShow } from '../models/kodiInterfaces/video';
import { AppNotification, AppNotificationType } from '../models/notification';
import { LocalStorageService, STORAGE_KEYS } from './local-storage.service';
import { MovieSetDetails } from "src/app/models/kodiInterfaces/others";

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
  openMovieSetDetails: MovieSetDetails | undefined;

  notifications: Map<number, AppNotification> = new Map<number, AppNotification>();

  musicsDefaultPlayer: string;

  constructor( @Inject(DOCUMENT) private document: Document, private localStorage: LocalStorageService, public translate: TranslateService, private http: HttpClient) {
    this.musicsDefaultPlayer = localStorage.getData("musicsDefaultPlayer") ?? "internal";
    this.checkUpdate();
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

  checkUpdate(){
    const currentVersion = environment.appVersion;
    if(this.localStorage.getData(STORAGE_KEYS.lastVersion) != currentVersion){
      this.localStorage.setData(STORAGE_KEYS.lastVersion, currentVersion);
      this.refreshTranslations();
      this.showNotification("notification.appUpdated", "notification.changelogsOnGithub", AppNotificationType.success);
    }
  }

  refreshTranslations(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma': 'no-cache',
        'Expires': '0'
      }),
    }

    for(const lang in this.translate.getLangs()){
      this.http.get<any>("/assets/i18n/" + this.translate.getLangs()[lang] + ".json", httpOptions).pipe(
        map(reponse => { this.translate.reloadLang(this.translate.getLangs()[lang]); } ),
        catchError((err) => {
            console.error(err);
            throw err;
        })
      ).subscribe();
    }
  }

}
