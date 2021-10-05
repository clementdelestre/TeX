import { Component, OnInit } from '@angular/core';
import { fastFadeAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { Filter, FilterOperatorList } from 'src/app/models/filter';
import { ListFilterFieldsMovies } from 'src/app/models/kodiInterfaces/listFilter';
import { ListSort, ListSortMethod, ListSortOrder } from 'src/app/models/kodiInterfaces/listItem';
import { ListLimits } from 'src/app/models/kodiInterfaces/others';
import { VideoDetailsMovie } from 'src/app/models/kodiInterfaces/video';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-movies-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    openCloseAnimation,
    fastFadeAnimation
  ],
})
export class MoviesHomeComponent implements OnInit {

  indexMovies = 0;
  maxMoviesPerPage:number = 50;
  moviesCount = 0;
  currentPage = 0;
  pageMovies:number[] = [];

  isLoadingMovies = true;

  inProgressMovies: VideoDetailsMovie[] = [];
  recentlyAddedMovies: VideoDetailsMovie[] = [];
  unwatchedMovies: VideoDetailsMovie[] = [];

  movies: VideoDetailsMovie[] = [];

  sortby: Map<string, ListSort> = new Map;
  currentSort: ListSort;

  constructor(private kodiApi:KodiApiService) {
    this.currentSort = {ignorearticle: true,  method: ListSortMethod.title, order: ListSortOrder.ascending};

    this.sortby.set("alphabetical", this.currentSort);
    this.sortby.set("alphabeticalInversed", {ignorearticle: true,  method: ListSortMethod.title, order: ListSortOrder.descending});
    this.sortby.set("random", {ignorearticle: true,  method: ListSortMethod.random});
   }

  ngOnInit(): void {
    this.getInProgressMovies();
    this.getRecentlyAddedMovies();
    this.getUnwatchedMovies();
    this.getMovies();
  }

  changeSort(sort: ListSort){
    this.currentSort = sort;
    this.getMovies(); 
  }

  getInProgressMovies(){

    const limitReq: ListLimits = {
      start: 0,
      end : 20
    }

    const progressFilter: Filter = {
      field: ListFilterFieldsMovies.inprogress,
      operator: FilterOperatorList.true,
      value: ""
    } 
    
    this.kodiApi.media.getMovies({limit:limitReq, filter: progressFilter }).subscribe((resp) => {
      if(resp.movies)
        this.inProgressMovies = resp.movies;
    });
  }

  getRecentlyAddedMovies(){  

    const limitReq: ListLimits = {
      start: 0,
      end : 20
    }

    this.kodiApi.media.getRecentlyAddedMovies({limit:limitReq}).subscribe((resp) => {
      if(resp?.movies)
        this.recentlyAddedMovies = resp.movies;
    });
  }

  getUnwatchedMovies(){

    const limitReq: ListLimits = {
      start: 0,
      end : 20
    }

    const filter: Filter = {
      field: ListFilterFieldsMovies.playcount,
      operator: FilterOperatorList.is,
      value: "0"
    } 

    const ratingSort:ListSort = {
      ignorearticle: true,  
      method: ListSortMethod.rating, 
      order: ListSortOrder.descending
    };
    
    this.kodiApi.media.getMovies({limit:limitReq, filter: filter, sort:ratingSort }).subscribe((resp) => {
      if(resp?.movies)
        this.unwatchedMovies = resp.movies;
    });
  }

  getMovies(){
    const limitReq: ListLimits = {
      start: this.currentPage * this.maxMoviesPerPage,
      end : this.currentPage * this.maxMoviesPerPage + this.maxMoviesPerPage
    }

    this.isLoadingMovies = true;

    this.kodiApi.media.getMovies({limit:limitReq, sort: this.currentSort}).subscribe((resp) => {
      if(resp?.movies){
        this.movies = resp.movies;
        this.indexMovies = resp.limits.start;
        this.moviesCount = resp.limits.total;
        this.pageMovies = [];
        for(let x = 0;x<this.moviesCount / this.maxMoviesPerPage;x++){
          this.pageMovies.push(x);
        }
        this.pageMovies.reverse();
        this.isLoadingMovies = false;
      }  
    });
  }

  incrementPage(){
    if(this.currentPage<this.pageMovies.length-1){
      this.currentPage++;
      this.getMovies();
    }
  }

  decrementPage(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.getMovies();
    }     
  }

  setPage(page: number){
    this.currentPage = page;
    this.getMovies();
  }

}
