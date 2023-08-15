import { Component, HostListener, Input, OnInit } from '@angular/core';
import {  SafeResourceUrl } from '@angular/platform-browser'
import { Location } from '@angular/common'
import { PlaylistItem } from 'src/app/models/kodiInterfaces/playlist';
import { VideoDetailsMovie, VideoDetailsTVShow } from 'src/app/models/kodiInterfaces/video';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { PlayerService } from 'src/app/services/player.service';
import { ApplicationService } from 'src/app/services/application.service';
import { heightAnimation, modalAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
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

  @Input() movieSet!: MovieSetDetails;
  @Input() isLoaded: boolean = false;

  collectionMovies: { [movieid: number]: VideoDetailsMovie } = []

  public get collectionMoviesArray() {
    return Object.values(this.collectionMovies).sort((a, b) => removeArticles(a.title ?? "").localeCompare(removeArticles(b.title ?? "")));
  }



  constructor(private kodiApi:KodiApiService) {

  }

  ngOnInit(): void {
    console.log(this.movieSet)
    for (const movie of this.movieSet.movies) {
      this.kodiApi.media.getMovieDetail(movie.movieid).subscribe((resp) => {
        this.collectionMovies[movie.movieid] = resp;
      })
    }
  }

}
