import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, map } from 'rxjs/operators';
import { AppNotificationType } from 'src/app/models/notification';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {

  version = environment.appVersion;

  vibrate:number = 50;
  constructor(private kodiApi:KodiApiService, public application:ApplicationService, private localStorage: LocalStorageService, public translate: TranslateService, private http: HttpClient) { }

  ngOnInit(): void {
    this.vibrate = this.localStorage.getData("vibrate") ?? 50;
    console.log(this.version);
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.localStorage.setData("lang", lang);
  }

  switchMusicsDefaultPlayer(player: string){
    this.localStorage.setData("musicsDefaultPlayer", player);
    this.application.musicsDefaultPlayer = player;
  }

  scanVideoLibrary(){
    this.kodiApi.media.scanVideoLibrary().subscribe();
  }

  cleanVideoLibrary(){
    this.kodiApi.media.cleanVideoLibrary().subscribe();
  }

  scanAudioLibrary(){
    this.kodiApi.media.scanAudioLibrary().subscribe();
  }

  cleanAudioLibrary(){
    this.kodiApi.media.cleanAudioLibrary().subscribe();
  }

  async resetApp()  {
    this.localStorage.clear()
    window.location.reload()
  }

  vibrateChange(value: any){
    this.localStorage.setData("vibrate", value);
    this.vibrate = value
    window.navigator.vibrate(value); 
  }

  refreshTranslation(){
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
    
    this.application.showNotification('notification.updatedTranslations', "notification.refreshPageToSee", AppNotificationType.success);
  }

}
