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
    translate.addLangs(['en', 'fr', 'da', 'de', 'es_mx', 'ko', 'pl', 'pt_br']);
    translate.use(this.localStorage.getData('lang') ?? 'en')
  } 

}


