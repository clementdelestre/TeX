import { Component, Input, OnInit } from '@angular/core';
import { VideoDetailsTVShow } from 'src/app/models/kodiInterfaces/video';
import { AppNotificationType } from 'src/app/models/notification';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-tvshow-edit',
  templateUrl: './tvshow-edit.component.html',
  styleUrls: ['./tvshow-edit.component.scss']
})
export class TvshowEditComponent implements OnInit {

  @Input() tvShow!: VideoDetailsTVShow;
  @Input() isLoaded: boolean = false;

  title: string = "";
  plot: string = "";
  studio: string = "";
  genres: string = "";

  constructor(private kodiApi:KodiApiService,  private application: ApplicationService) { }

  ngOnInit(): void {
    this.displayData();
  }

  displayData(){
    this.title = this.tvShow?.title ?? "";
    this.plot = this.tvShow?.plot ?? "";
    this.studio = this.tvShow?.studio?.join('; ') ?? "";
    this.genres = this.tvShow?.genre?.join('; ') ?? "";
  }

  save(){
    this.tvShow.title = this.title;
    this.tvShow.plot = this.plot;
    this.tvShow.studio = this.studio.split("; ");
    this.tvShow.genre = this.genres.split("; ");

    const params = {
      "tvshowid" : this.tvShow.tvshowid,
      "title" : this.title,
      "plot" : this.plot,
      ...this.studio.length > 0 ? {"studio" : this.studio.split("; ") } : undefined,
      ...this.genres.length > 0 ? { "genre" : this.genres.split("; ") } : undefined,
    }



    this.kodiApi.media.setTvShowDetails(params).subscribe(resp => {
      if(resp == "OK"){
        this.application.showNotification('notification.success', "notification.contentUpdated", AppNotificationType.success);
      } else {
        this.application.showNotification('notification.error', "notification.contentNotUpdated", AppNotificationType.error);
      }
    }) 
  }

  refreshData(){
    this.kodiApi.media.refreshTvShow(this.tvShow.tvshowid)
    this.application.showNotification('notification.contentUpdated', "notification.refreshPageToSee", AppNotificationType.success);
  }

  removeTvShow(){
    this.kodiApi.media.removeTvShow(this.tvShow.tvshowid).subscribe(resp => {
      if(resp == "OK"){
        this.application.showNotification('notification.success', "notification.contentRemoved", AppNotificationType.success);
      } else {
        this.application.showNotification('notification.error', "notification.contentNotRemoved", AppNotificationType.error);
      }
    }) 
  }

}
