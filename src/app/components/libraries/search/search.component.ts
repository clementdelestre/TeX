import { Component, OnInit } from '@angular/core';
import { fastFadeAnimation, heightAnimation, modalAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { AudioDetailsSong } from 'src/app/models/kodiInterfaces/audio';
import { VideoDetailsMovie, VideoDetailsTVShow } from 'src/app/models/kodiInterfaces/video';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    openCloseAnimation,
    modalAnimation,
    heightAnimation,
    fastFadeAnimation
  ]
})
export class SearchComponent implements OnInit {

  

  constructor(public searchService: SearchService, private kodiApi: KodiApiService) { }

  ngOnInit(): void {
    
  }

  
  modelChangeFn(e:any){
    this.searchService.searchFilterField = e;
  }
  

}
