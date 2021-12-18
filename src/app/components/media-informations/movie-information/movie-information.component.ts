import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ClipboardService } from 'ngx-clipboard';
import { heightAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { ListItemFile } from 'src/app/models/kodiInterfaces/listItem';
import { VideoDetailsMovie } from 'src/app/models/kodiInterfaces/video';
import { AppNotificationType } from 'src/app/models/notification';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-movie-information',
  templateUrl: './movie-information.component.html',
  styleUrls: ['./movie-information.component.scss'],
  animations: [
    heightAnimation,
    openCloseAnimation
  ]
})
export class MovieInformationComponent implements OnInit {

  @Input() movie!: VideoDetailsMovie;
  @Input() isLoaded: boolean = false;

  trailerUrl:SafeResourceUrl = "";
  downloadUrl: string = "";

  moreInfo = false;
  fileDetails!:ListItemFile;

  constructor(private kodiApi:KodiApiService, private _sanitizer: DomSanitizer, private application: ApplicationService, private clipboardApi: ClipboardService) { }

  ngOnInit(): void {

    if(this.movie.trailer)
      this.trailerUrl = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.movie.trailer.split("=")[2]);
    
    if(this.movie.file){
      this.kodiApi.file.getPreparedFileUrl(this.movie.file).subscribe((resp) => {
        this.downloadUrl = resp;
      });
    }
    
  }

  ngOnChanges(changes: SimpleChanges) {
        
    if(changes.isLoaded.currentValue){
      this.trailerUrl = this._sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + this.movie.trailer?.split("=")[2]);

      if(this.movie.file)
      this.kodiApi.file.getPreparedFileUrl(this.movie.file).subscribe((resp) => {
        this.downloadUrl = resp;
      });
    }   
  }


  toogleMoreInfo() : void {
    if(!this.isLoaded) return;
    if(!this.fileDetails && !this.moreInfo){
      if(this.movie.file)
      this.kodiApi.file.getFileDetails(this.movie.file, "video").subscribe((resp) => {
        if(resp?.filedetails)
          this.fileDetails = resp.filedetails;
        this.moreInfo = true;
      });
    } else {
      this.moreInfo = !this.moreInfo;
    }
    
  }

  getSize(value: number) : number {
    return Number((value/Math.pow(10, 9)).toFixed(2));
  }

  streamLink(){
    this.clipboardApi.copyFromContent(this.downloadUrl);
    this.application.showNotification('library.musicsView.linkCopied', "library.musicsView.linkWasCopiedInClipBoard", AppNotificationType.success);
  }

  refreshData(){
    this.kodiApi.media.refreshMovie(this.movie.movieid)
    this.application.showNotification('notification.contentUpdated', "notification.refreshPageToSee", AppNotificationType.success);
  }

  getAudioChannels(channels: number){
    switch(channels){
      case 6:
        return "5.1";
      case 4:
        return "3.1";
      default:
        return channels + "";
    }
  }

}
