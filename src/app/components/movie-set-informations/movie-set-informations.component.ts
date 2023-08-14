import { Component, HostListener, Input, OnInit } from '@angular/core';
import {  SafeResourceUrl } from '@angular/platform-browser'
import { Location } from '@angular/common'
import { PlaylistItem } from 'src/app/models/kodiInterfaces/playlist';
import { VideoDetailsMovie, VideoDetailsTVShow } from 'src/app/models/kodiInterfaces/video';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { PlayerService } from 'src/app/services/player.service';
import { ApplicationService } from 'src/app/services/application.service';
import { heightAnimation, modalAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { delay } from 'rxjs/operators';
import { AppNotificationType } from 'src/app/models/notification';
import { MovieSetDetails } from "src/app/models/kodiInterfaces/others";

function removeArticles(str:string): string {
  let words = str.toLowerCase().split(" ");
  if (words.length <= 1) return str;
  if (words[0] == 'a' || words[0] == 'the' || words[0] == 'an')
    return words.splice(1).join(" ");
  return str;
}

@Component({
  selector: 'app-movie-set-informations',
  templateUrl: './movie-set-informations.component.html',
  styleUrls: ['./movie-set-informations.component.scss'],
  animations: [
    openCloseAnimation,
    heightAnimation
  ]
})
export class MovieSetInformationsComponent implements OnInit {

  @Input() movieSetId!: number;
  isLoaded: boolean = false;
  private _media!: MovieSetDetails;
  edit = false;
  collectionMovies: { [movieid: number]: VideoDetailsMovie } = []

  public get collectionMoviesArray() {
    return Object.values(this.collectionMovies).sort((a, b) => removeArticles(a.title ?? "").localeCompare(removeArticles(b.title ?? "")));
  }

  public get media() {
      return this._media;
  }

  public set media(newVal: MovieSetDetails) {
    this._media = newVal;
    for (const movie of newVal.movies) {
      this.kodiApi.media.getMovieDetail(movie.movieid).subscribe((resp) => {
        this.collectionMovies[movie.movieid] = resp;
      })
    }
  }

  fanartUrl: string = "";

  constructor(private kodiApi:KodiApiService, public player:PlayerService, private location: Location, private application: ApplicationService) {

  }

  ngOnInit(): void {
    this.application.toggleBodyScroll(false);

    this.movieSetId = this.application.openMovieSetDetails?.setid ?? 0;

    if(this.application.openMovieSetDetails)
      this.media = this.application.openMovieSetDetails;

    this.load()
  }

  async load() {
    if (this.movieSetId != 0) {
      this.kodiApi.media.getMovieSetDetail(this.movieSetId).subscribe((resp) => {
        this.media = resp;
        this.isLoaded = true;

        if (this.media.fanart)
          this.kodiApi.file.getPreparedFileUrl(this.media.fanart).subscribe((resp) => {
            this.fanartUrl = resp;
          });
      })
    }
  }

  ngOnDestroy(): void {
    this.application.toggleBodyScroll(true);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
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
    this.application.openMovieSetDetails = undefined;
    this.location.back();
  }

  toggleEdit() {
    this.edit = !this.edit;
  }
}
