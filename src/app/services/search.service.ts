import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Filter, FilterOperatorList } from '../models/filter';
import { AudioDetailsAlbum, AudioDetailsArtist, AudioDetailsSong } from '../models/kodiInterfaces/audio';
import { ListLimits } from '../models/kodiInterfaces/others';
import { VideoDetailsMovie, VideoDetailsTVShow } from '../models/kodiInterfaces/video';
import { KodiApiService } from './kodi-api.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  backUrl: string = "";

  selectedFilter:Filter[] = []
  textSearch = "";

  movies: VideoDetailsMovie[] = [];
  tvShows: VideoDetailsTVShow[] = [];
  songs: AudioDetailsSong[] = [];

  moviesSearch = true;
  tvshowsSearch = true;
  songsSearch = true;

  result: any = {};

  constructor(private kodiApi: KodiApiService, private router:Router) { }

  openSearchPage(){
    this.backUrl = this.router.url;
    this.router.navigateByUrl("/search");
  }

  closeSearchPage(){
    if(this.backUrl != ""){
      this.router.navigateByUrl(this.backUrl);
    }
  }

  toggleFilter(field: string, value: any){
    const filter: Filter = {
      field: field,
      operator: FilterOperatorList.contains,
      value: value
    }

    this.addFilter(filter);
  }

  getStringFilter(){ 

    let fieldList: string[] = [];

    this.selectedFilter.forEach(filter => {
      if(fieldList.indexOf(filter.field) == -1){
        fieldList.push(filter.field);
      }
    })

    let globalAnd: any[] = []

    fieldList.forEach(field => {
      let or: Filter[] = []
      this.selectedFilter.filter(filter => filter.field == field).forEach(filter => {
        or.push(filter);
      });

      globalAnd.push({"or" : or});
    });

    if(this.textSearch != ""){

      const textFilter: Filter = {
        field: "title",
        operator: FilterOperatorList.contains,
        value: this.textSearch
      } 

      globalAnd.push({"or" : [textFilter]});
    }

    if(globalAnd.length > 0){
      this.result = {"and" : globalAnd}
    } else {
      this.result = undefined;
    }

  }

  private getLimits() : ListLimits {
    return {
      start: 0,
      end : (this.textSearch == "" && this.selectedFilter.length == 0) ? 5 : 20
    }
  }

  search(){

    this.getStringFilter();

    const routeData:string = this.router.url;
    if(routeData.indexOf("search") == -1 && (this.selectedFilter.length != 0 || this.textSearch != "")){
      this.openSearchPage();
    }

    if(routeData.indexOf("search") != -1 && (this.selectedFilter.length == 0 && this.textSearch == "")){
      this.closeSearchPage();
    }

    if(this.moviesSearch){
      this.kodiApi.media.getMovies({limit: this.getLimits(), filter: this.result}).subscribe((resp) => {
        this.movies = resp.movies ?? [];
      });
    }
    
    if(this.tvshowsSearch){
      this.kodiApi.media.getTvShows({limit: this.getLimits(), filter: this.result}).subscribe((resp) => {
        this.tvShows = resp.tvshows ?? [];
      });
    }

    if(this.songsSearch){
      this.kodiApi.media.getSongs({limit: this.getLimits(), filter: this.result}).subscribe(resp => {
        this.songs = resp.songs ?? [];
      })
    }
   
  }

  addFilter(filterAdd: Filter){
    let filters = this.selectedFilter.filter(filter => filter.field == filterAdd.field && filter.value == filterAdd.value)

    if(filters.length == 0){
      this.selectedFilter.push(filterAdd);
    } else {
      this.selectedFilter.splice(this.selectedFilter.indexOf(filters[0]), 1);
    }

    this.search()
  }

}
