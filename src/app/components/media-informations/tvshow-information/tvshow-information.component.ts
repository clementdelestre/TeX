import { Component, Input, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { heightAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { VideoDetailsEpisode, VideoDetailsSeason, VideoDetailsTVShow } from 'src/app/models/kodiInterfaces/video';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-tvshow-information',
  templateUrl: './tvshow-information.component.html',
  styleUrls: ['./tvshow-information.component.scss'],
  animations: [
    heightAnimation,
    openCloseAnimation
  ]
})
export class TvshowInformationComponent implements OnInit {

  @Input() tvShow!: VideoDetailsTVShow;
  @Input() isLoaded: boolean = false;

  showSeasonList = false;

  seasons: VideoDetailsSeason[] = [];
  currentSeason: VideoDetailsSeason | undefined;

  episodes:VideoDetailsEpisode[] = [];

  constructor(private kodiApi:KodiApiService, private application: ApplicationService) { }

  ngOnInit(): void {
    this.kodiApi.media.getSeasons(this.tvShow.tvshowid).subscribe((resp) => {
      this.seasons = resp.seasons;  
      if(this.seasons.length>0)
        this.displaySeason(this.seasons[0])
    });

  }

  toggleSeasonList():void { this.showSeasonList = !this.showSeasonList};

  displaySeason(season: VideoDetailsSeason){
    this.showSeasonList = false;
    this.currentSeason = undefined;

    this.application.blurActive();

    if(season?.tvshowid && season?.season)
    this.kodiApi.media.getEpisodes(season.tvshowid, season.season).subscribe((resp) => {
      this.episodes = resp.episodes.sort((a, b) => (a.episode ?? 0) -(b.episode ?? 0));
      this.currentSeason = season;
    });

  }

}
