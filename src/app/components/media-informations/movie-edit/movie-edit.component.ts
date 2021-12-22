import { Component, Input, OnInit } from '@angular/core';
import { VideoDetailsMovie } from 'src/app/models/kodiInterfaces/video';
import { AppNotificationType } from 'src/app/models/notification';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent implements OnInit {

  @Input() movie!: VideoDetailsMovie;
  @Input() isLoaded: boolean = false;

  title: string = "";
  tagline: string = "";
  plot: string = "";
  studio: string = "";
  directors: string = "";
  writers: string = "";
  genres: string = "";
  countries: string = "";
  set: string = "";
  tags: string = "";

  constructor(private kodiApi:KodiApiService,  private application: ApplicationService) { }

  ngOnInit(): void {
    this.displayData();
  }

  displayData(){
    this.title = this.movie?.title ?? "";
    this.tagline = this.movie?.tagline ?? "";
    this.plot = this.movie?.plot ?? "";
    this.studio = this.movie?.studio?.join('; ') ?? "";
    this.directors = this.movie?.director?.join('; ') ?? "";
    this.writers = this.movie?.writer?.join('; ') ?? "";
    this.genres = this.movie?.genre?.join('; ') ?? "";
    this.countries = this.movie?.country?.join('; ') ?? "";
    this.set = this.movie?.set ?? "";
    this.tags = this.movie?.tag?.join('; ') ?? "";
  }

  save(){
    this.movie.title = this.title;
    this.movie.tagline = this.tagline;
    this.movie.plot = this.plot;
    this.movie.studio = this.studio.split("; ");
    this.movie.director = this.directors.split("; ");
    this.movie.writer = this.writers.split("; ");
    this.movie.genre = this.genres.split("; ");
    this.movie.country = this.countries.split("; ");
    this.movie.set = this.set;
    this.movie.tag = this.tags.split("; ");

    const params = {
      "movieid" : this.movie.movieid,
      "title" : this.title,
      "tagline" : this.tagline,
      "plot" : this.plot,
      ...this.studio.length > 0 ? {"studio" : this.studio.split("; ") } : undefined,
      ...this.directors.length > 0 ? { "director" : this.directors.split("; ") } : undefined,
      ...this.writers.length > 0 ? { "writer" : this.writers.split("; ") } : undefined,
      ...this.genres.length > 0 ? { "genre" : this.genres.split("; ") } : undefined,
      ...this.countries.length > 0 ? { "country" : this.countries.split("; ") } : undefined,
      "set" : this.set,
      ...this.tags.length > 0 ? { "tag" : this.tags.split("; ") } : undefined,
    }

    this.kodiApi.media.setMovieDetails(params).subscribe(resp => {
      if(resp == "OK"){
        this.application.showNotification('notification.success', "notification.contentUpdated", AppNotificationType.success);
      } else {
        console.log(resp);
        this.application.showNotification('notification.error', "notification.contentNotUpdated", AppNotificationType.error);
      }
    }) 
  }

  refreshData(){
    this.kodiApi.media.refreshMovie(this.movie.movieid)
    this.application.showNotification('notification.contentUpdated', "notification.refreshPageToSee", AppNotificationType.success);
  }

  removeMovie(){
    this.kodiApi.media.removeMovie(this.movie.movieid).subscribe(resp => {
      if(resp == "OK"){
        this.application.showNotification('notification.success', "notification.contentRemoved", AppNotificationType.success);
      } else {
        this.application.showNotification('notification.error', "notification.contentNotRemoved", AppNotificationType.error);
      }
    }) 
  }

}
