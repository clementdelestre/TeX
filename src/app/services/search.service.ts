import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VideoDetailsMovie, VideoDetailsTVShow } from '../models/kodiInterfaces/video';
import { KodiApiService } from './kodi-api.service';

export enum FilterList {
  Directors = "Directors",
  Writers = "Writers",
  Years = "Years",
  Genres = "Genres",
  Actors = "Actors"
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  backUrl: string = "";
  textSearch = "";

  directors:string[] = []
  writers:string[] = []
  actors:string[] = []
  years:string[] = []
  genres:string[] = []

  directorsFilter:string[] = []
  writersFilter:string[] = []
  actorsFilter:string[] = []
  yearsFilter:string[] = []
  genresFilter:string[] = []

  movies: VideoDetailsMovie[] = [];
  tvShows: VideoDetailsTVShow[] = [];

  public FilterList = FilterList;
  showFilterMenu: string = "";

  searchFilterField = ""

  searchMovies = true
  searchTvShows = true

  constructor(private kodiApi: KodiApiService, private router:Router) {
    this.loadData()
   }

  openSearchPage(){
    if( (this.backUrl == "" && this.router.url != "/search") || (this.router.url != "/search" && this.textSearch != "")){
      this.backUrl = this.router.url;
      this.router.navigateByUrl("/search");
    }
  }

  closeSearchPage(){
    if(this.backUrl != ""){
      this.router.navigateByUrl(this.backUrl);
      this.backUrl = ""
    }
  }

  loadData(){
    this.directors = []
    this.writers = []
    this.actors = []
    this.years = []
    this.genres = []

    this.movies = [];
    this.tvShows = [];

    this.loadDirectors()
    this.loadWriters()
    this.loadYears()
    this.loadGenres()
    this.loadActors()

    this.loadMovies()
    this.loadTvShows()
  }

  clearFilters(){
    this.directorsFilter = []
    this.writersFilter = []
    this.actorsFilter = []
    this.yearsFilter = []
    this.genresFilter = []

    this.searchFilterField = ""
    this.textSearch = ""
  }

  toggleSearchMovies(value: boolean){
    this.searchMovies = value
  }

  toggleSearchTVShows(value: boolean){
    this.searchTvShows = value
  }


  showFilterValues(filter:string){
    if(this.showFilterMenu == filter){
      this.showFilterMenu = "";
      return;
    }
    this.searchFilterField = ""
    this.showFilterMenu = filter;
  }

  getFilterValues(filter:string){
    let array = []
    switch(filter){
      case FilterList.Directors:
        array =  this.directors
        break;
      case FilterList.Writers:
        array =  this.writers
        break;
        case FilterList.Years:
          array =  this.years
          break;
        case FilterList.Genres:
          array =  this.genres
          break;
        case FilterList.Actors:
            array =  this.actors
            break;
      default:
        return []
    }

    if(filter == FilterList.Actors){
      return array.filter(c => c.toLocaleLowerCase().includes(this.searchFilterField.toLocaleLowerCase())).sort().slice(0,50)
    } else {
      return array.filter(c => c.toLocaleLowerCase().includes(this.searchFilterField.toLocaleLowerCase())).sort()
    }
  }

  getArrayFilterFromFilter(filter:string){
    switch(filter){
      case FilterList.Directors:
        return this.directorsFilter
      case FilterList.Writers:
        return this.writersFilter
        case FilterList.Years:
          return this.yearsFilter
        case FilterList.Genres:
          return this.genresFilter
        case FilterList.Actors:
          return this.actorsFilter
        default:
          return []
    }
  }

  changeFilterValue(filter:string, value:string){
    let array:string[] = this.getArrayFilterFromFilter(filter)
    
    if(array.indexOf(value) === -1){
      array.push(value)
    } else {
      const index = array.indexOf(value, 0);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
  }

  checkFilterStatus(filter:string, value:string){
    return this.getArrayFilterFromFilter(filter).indexOf(value) > -1
  }

  loadDirectors(){
    this.directors = []

    this.kodiApi.media.getMovies({ propoerties: ["director"] }).subscribe(resp => {
      if(resp?.movies){
        //Directors
        resp.movies.forEach(e => {
          e.director?.map(d => { if (this.directors.indexOf(d) === -1) this.directors.push(d) })
        })
      }
    })

  }

  loadWriters(){
    this.writers = []

    this.kodiApi.media.getMovies({ propoerties: ["writer"] }).subscribe(resp => {
      if(resp?.movies){
        //Writers
        resp.movies.forEach(e => {
          e.writer?.map(d => { if (this.writers.indexOf(d) === -1) this.writers.push(d) })
        })
      }
    })

  }

  loadActors(){
    this.kodiApi.media.getMovies({ propoerties: ["cast"] }).subscribe(resp => {
      if(resp?.movies){
        //Actors
        resp.movies.forEach(e => {
          e.cast?.map(d => { if (this.actors.indexOf(d.name) === -1) this.actors.push(d.name) })
        })
      }
    })
  }

  loadYears(){
    this.kodiApi.media.getMovies({ propoerties: ["year"] }).subscribe(resp => {
      if(resp?.movies){
        //Years
        resp.movies.forEach(e => {
          if (this.years.indexOf(e.year?.toString() ?? '') === -1) this.years.push(e.year?.toString() ?? "")
        })
      }
    })
    
  }

  loadGenres(){
    this.kodiApi.media.getVideoLibraryGenres({type:"movie"}).subscribe(resp => {
      if(resp?.genres){
        //Genres
        resp.genres.forEach(e => {
         if (this.genres.indexOf(e.title) === -1) this.genres.push(e.title)
        })
      }
    })

    this.kodiApi.media.getVideoLibraryGenres({type:"tvshow"}).subscribe(resp => {
      if(resp?.genres){
        //Genres
        resp.genres.forEach(e => {
         if (this.genres.indexOf(e.title) === -1) this.genres.push(e.title)
        })
      }
    })
  }

  containsAll(arr:any[], arr2:any[]){
    return arr2.some(i => arr.includes(i));
  }

  loadMovies(){
    this.kodiApi.media.getMovies({ propoerties: ["director", "year", "art", "title", "resume", "rating", "genre", "writer", "cast"] }).subscribe(resp => {
      if(resp?.movies){
        this.movies = resp.movies
      }
    })
  }

  getMovies(){
    return this.movies.filter(e => 
      ((this.containsAll(e.director ?? [], this.directorsFilter) && (e.director ?? []).length > 0) && this.directorsFilter.length > 0
      || (this.containsAll(e.writer ?? [], this.writersFilter) && (e.writer ?? []).length > 0) && this.writersFilter.length > 0
      || (this.containsAll(e.cast.map(cast => cast.name) ?? [], this.actorsFilter) && (e.cast ?? []).length > 0) && this.actorsFilter.length > 0
      || (this.containsAll(e.genre ?? [], this.genresFilter) && (e.genre ?? []).length > 0) && this.genresFilter.length > 0
      || (this.yearsFilter.indexOf(e.year?.toString() ?? "") > -1)  && this.yearsFilter.length > 0)
      || ((e.title!.toLocaleLowerCase().indexOf(this.textSearch.toLocaleLowerCase() ?? "") > -1 && this.textSearch.length > 0))
      )
  }

  loadTvShows(){
    this.kodiApi.media.getTvShows({ propoerties: ["year", "art", "title", "genre", "cast"] }).subscribe(resp => {
      if(resp?.tvshows){
        this.tvShows = resp.tvshows
      }
    })
  }

  getTvShows(){
    return this.tvShows.filter(e => 
      (this.containsAll(e.genre ?? [], this.genresFilter) && (e.genre ?? []).length > 0) && this.genresFilter.length > 0
      || (this.yearsFilter.indexOf(e.year?.toString() ?? "") > -1)  && this.yearsFilter.length > 0
      || ((e.title!.toLocaleLowerCase().indexOf(this.textSearch.toLocaleLowerCase() ?? "") > -1 && this.textSearch.length > 0))
      )
  }

}
