import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { Location } from '@angular/common'
import { KodiwebsocketService } from 'src/app/services/kodiwebsocket.service';
import { LocalStorageService, STORAGE_KEYS } from 'src/app/services/local-storage.service';
import { environment } from '../../../environments/environment';

export enum Page {
  general = "general",
  appearance = "appearance",
  advanced = "advanced"
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class SettingsComponent implements OnInit {

  page:Page = Page.general;
  isHome:boolean = false;
  version = environment.appVersion;

  constructor(private location:Location, private router: Router,) { }

  ngOnInit(): void {

    this.displayPage(this.router.url.split("/")[2] ?? '');

    this.location.onUrlChange(() => {
      this.displayPage(this.router.url.split("/")[2] ?? '')
    });

  }

  isPage(page: string): boolean {
    return page == this.page;
  }

  displayPage(page: string){
    this.isHome = false;
    switch(page){
      case "general":
        this.page = Page.general;
        break;
      case "appearance":
        this.page = Page.appearance;
        break;
      case "advanced":
          this.page = Page.advanced;
          break;
      default:
        this.isHome = true;
        this.page = Page.general;
    }
  }


}
