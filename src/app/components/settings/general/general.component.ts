import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService } from 'src/app/services/application.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-settings-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
})
export class GeneralComponent implements OnInit {

  constructor(public application:ApplicationService, private localStorage: LocalStorageService, public translate: TranslateService) { }

  ngOnInit(): void {
  }

  switchLang(lang: string) {
    this.translate.use(lang);
    this.localStorage.setData("lang", lang);
  }

  switchMusicsDefaultPlayer(player: string){
    this.localStorage.setData("musicsDefaultPlayer", player);
    this.application.musicsDefaultPlayer = player;
  }

}
