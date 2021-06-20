import {  PlatformLocation } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import {  SafeResourceUrl } from '@angular/platform-browser'
import { Location } from '@angular/common'
import { PlaylistItem } from 'src/app/models/kodiInterfaces/playlist';
import { VideoDetailsMovie, VideoDetailsTVShow } from 'src/app/models/kodiInterfaces/video';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { PlayerService } from 'src/app/services/player.service';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { heightAnimation, modalAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-media-informations',
  templateUrl: './media-informations.component.html',
  styleUrls: ['./media-informations.component.scss'],
  animations: [
    openCloseAnimation,
    heightAnimation
  ]
})
export class MediaInformationsComponent implements OnInit {

  @Input() movieId!: number;
  @Input() tvShowId!: number;

  isLoaded:boolean = false;
  media!: VideoDetailsMovie | VideoDetailsTVShow;

  trailerUrl:SafeResourceUrl = "";
  fanartUrl: string = "";

  canAddMovieToPlaylist: boolean = false;

  constructor(private kodiApi:KodiApiService, public player:PlayerService, private location: Location, private application: ApplicationService) {

  }

  ngOnInit(): void {
    
    this.application.toggleBodyScroll(false);

    this.movieId = this.application.openMovieDetails?.movieid ?? 0;
    this.tvShowId = this.application.openTVShowDetails?.tvshowid ?? 0; 

    if(this.application.openMovieDetails)
      this.media = this.application.openMovieDetails;
    
    if(this.application.openTVShowDetails)
      this.media = this.application.openTVShowDetails;

    this.load()
  }

  async load(){

    if(this.movieId != 0){

      this.kodiApi.media.getMovieDetail(this.movieId).pipe(delay(1000)).subscribe((resp) => {
        this.media = resp;
        this.isLoaded = true;
        
        if(this.media.art?.fanart)
        this.kodiApi.file.getPreparedFileUrl(this.media.art.fanart).subscribe((resp) => {
          this.fanartUrl = resp;
        });

      });

      if(this.player.currentPlayer?.properties?.playlistid){
        this.kodiApi.playlist.getPlaylistItem(this.player.currentPlayer?.properties.playlistid).subscribe(resp => {
          if(resp.items.filter(item => item.id === this.movieId).length == 0){
            this.canAddMovieToPlaylist = true;
          }
        });
      }
    }

    if(this.tvShowId != 0){
      
      this.kodiApi.media.getTvShowDetail(this.tvShowId).subscribe((resp) => {
        this.media = resp;
        this.isLoaded = true;
        
        if(this.media.art?.fanart)
        this.kodiApi.file.getPreparedFileUrl(this.media.art.fanart).subscribe((resp) => {
          this.fanartUrl = resp.replace("original", "w1280");
        });

      });
    }
  }

  ngOnDestroy(): void {
    this.application.toggleBodyScroll(true);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event:Event) {
    this.close();
  }

  clickBg(event:any){
    if(event.target.classList.contains('back')){
      this.close();
    }
  }

  close() {
    this.application.openMovieDetails = undefined;
    this.application.openTVShowDetails = undefined;
    this.location.back();
  }

  isMovie(): boolean { return this.media ? (this.media as VideoDetailsMovie).movieid !== undefined : true; }

  
  playMovie(){
    this.player.openMediaFile((this.media as VideoDetailsMovie).file ?? "");
  }

  addMovieToPlaylist(){    
    const item: PlaylistItem = {
      movieid: this.movieId,
    }
    this.kodiApi.playlist.add(1, item);
    this.canAddMovieToPlaylist = false;  
  }

  setWatched(watched: boolean){
    let params: Map<string, any> = new Map<string, any>();   
    if(watched){
      params.set("playcount", 1);
      this.media.playcount = 1;
    } else {
      params.set("playcount", 0);
      this.media.playcount = 0;
    }
    
    if(this.isMovie()){   
      this.kodiApi.media.setMovieDetails(this.movieId, params).subscribe()
    }
  }
}
