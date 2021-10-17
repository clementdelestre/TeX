import { Component, OnInit } from '@angular/core';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { fastFadeAnimation, modalAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { searchMenuItem } from 'src/app/models/searchMenu';
import { Location} from '@angular/common'; 
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.scss'],
  animations: [
    modalAnimation,
    openCloseAnimation,
    fastFadeAnimation
  ],
})
export class TvshowsComponent implements OnInit {

  constructor(private kodiApi:KodiApiService, private application:ApplicationService, private location:Location) {
    
  }

  ngOnInit(): void {

    this.location.onUrlChange(() => {
      this.checkUrl()
    });

    this.checkUrl();
    
  }

  checkUrl(){  
    const routeData: (string)[] = this.location.path().split("/");
    if(routeData[1] == "tvshow"){
      this.kodiApi.media.getTvShowDetail(parseInt(routeData[2])).subscribe(tvshow => {
        this.application.openTVShowDetails = tvshow;  
      });         
    } else {
      this.application.openTVShowDetails = undefined;
    }
  }

  itemMenu:searchMenuItem[] = [
    {
      title: "library.genres",
      icon: "theater-masks",
      page : "genres"
    },
    {
      title: "library.actors",
      icon: "users",
      page : "actors"
    },
    {
      title: "library.years",
      icon: "calendar-alt",
      page : "years"
    },
  ]

 

  scanVideoLibrary(){
    this.kodiApi.media.scanVideoLibrary().subscribe();
  }

  cleanVideoLibrary(){
    this.kodiApi.media.cleanVideoLibrary().subscribe();
  }
}
