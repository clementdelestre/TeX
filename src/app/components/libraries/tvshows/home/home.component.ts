import { Component, OnInit } from '@angular/core';
import { ListSort, ListSortMethod, ListSortOrder } from 'src/app/models/kodiInterfaces/listItem';
import { VideoDetailsTVShow } from 'src/app/models/kodiInterfaces/video';
import { ApplicationService } from 'src/app/services/application.service';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { ListLimits } from 'src/app/models/kodiInterfaces/others';

@Component({
  selector: 'app-tvshow-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class TvShowsHomeComponent implements OnInit {

  indexTVShows = 0;
  maxTVShowsPerPage:number = 50;
  tvShowsCount = 0;
  currentPage = 0;
  pageMovies:number[] = [];

  isLoadingTVShows = true;

  inProgressTVShows: VideoDetailsTVShow[] = [];
  tvShows: VideoDetailsTVShow[] = [];

  sortby: Map<string, ListSort> = new Map;
  currentSort: ListSort;

  constructor(private kodiApi:KodiApiService) {
    this.currentSort = {ignorearticle: true,  method: ListSortMethod.title, order: ListSortOrder.ascending};

    this.sortby.set("alphabetical", this.currentSort);
    this.sortby.set("alphabeticalInversed", {ignorearticle: true,  method: ListSortMethod.title, order: ListSortOrder.descending});
    this.sortby.set("random", {ignorearticle: true,  method: ListSortMethod.random});
   }

  ngOnInit(): void {
    this.getInProgressTVShows();
    this.changeSort(this.currentSort);
  }

  changeSort(sort: ListSort){
    this.currentSort = sort;
    this.getTVShows();
  }

  getInProgressTVShows(){
    
    this.kodiApi.media.getInProgressTvShows({}).subscribe((resp) => {
      if(resp?.tvshows)
        this.inProgressTVShows = resp.tvshows;
    });
  }

  getTVShows(){
    const limitReq: ListLimits = {
      start: this.currentPage * this.maxTVShowsPerPage,
      end : this.currentPage * this.maxTVShowsPerPage + this.maxTVShowsPerPage
    }

    this.isLoadingTVShows = true;

    this.kodiApi.media.getTvShows({limit:limitReq, sort: this.currentSort}).subscribe((resp) => {
      if(resp?.tvshows){
        this.tvShows = resp.tvshows;
        this.indexTVShows = resp.limits.start;
        this.tvShowsCount = resp.limits.total;
        this.pageMovies = [];
        for(let x = 0;x<this.tvShowsCount / this.maxTVShowsPerPage;x++){
          this.pageMovies.push(x);
        }
        this.pageMovies.reverse();
        this.isLoadingTVShows = false;
    
      }
    });  
  }

  incrementPage(){
    if(this.currentPage<this.pageMovies.length-1){
      this.currentPage++;
      this.getTVShows();
    }
  }

  decrementPage(){
    if(this.currentPage > 0){
      this.currentPage--;
      this.getTVShows();
    }     
  }

  setPage(page: number){
    this.currentPage = page;
    this.getTVShows();
  }

}
