import { Component } from '@angular/core';
import { modalAnimation, modalAnimationReverse, openCloseAnimation } from './models/appAnimation';
import { ApplicationService } from './services/application.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    modalAnimation,
    modalAnimationReverse,
    openCloseAnimation
  ],
})
export class AppComponent {
  title = 'TeX';

  constructor(public application:ApplicationService, public translate: TranslateService, private localStorage: LocalStorageService) {
    translate.addLangs([
      'ast',
      'ca',
      'cs',
      'en', 
      'en_us',
      'fr', 
      'da', 
      'de', 
      'es_mx', 
      'es', 
      'et',
      'fi',
      'hu',
      'id',
      'it', 
      'ka_ge',
      'kl',
      'ko',
      'lt',
      'nb', 
      'nl',
      'oc_fr',
      'pl',
      'sv', 
      'ko', 
      'pt_br', 
      'ro_md',
      'ru',
      'scn',
      'sk',
      'sv',
      'zh_cn',
      'zh_tw'
    ]);
    translate.use(this.localStorage.getData('lang') ?? 'en')
  } 

}


