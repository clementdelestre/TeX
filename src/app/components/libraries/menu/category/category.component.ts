import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fastFadeAnimation, heightAnimation } from 'src/app/models/appAnimation';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { Location} from '@angular/common';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-movies-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    fastFadeAnimation,
    heightAnimation
  ]
})
export class LibraryCategoryComponent implements OnInit {

  contents: string[] = [];
  contentsFilter: string[] = [];
  contentsToShow: string[] = [];

  title: string = "";
  isLoading = true;
  filterName = "";

  searchTextValue = ""

  constructor(private kodiApi: KodiApiService, private router: Router, private location:Location, public searchService: SearchService) { }

  ngOnInit(): void {
    this.getContent();
    this.location.onUrlChange(() => {
      this.getContent()
    });
  }


  getContent(){

    this.isLoading = true;

    if(this.router.url.split("/")[1] == "movies"){
      this.loadMoviesData()
    } else if(this.router.url.split("/")[1] == "tvshows"){
      this.loadTvShowsData()
    }
   
  }

  openContent(content: string){
    this.searchService.clearFilters()
    this.searchService.getArrayFilterFromFilter(this.filterName).push(content)
    this.router.navigateByUrl("/search")
  }

  modelChangeFn(e:any){
    this.searchTextValue = e;
    this.contentsFilter = this.contents.filter(c => c.toLocaleLowerCase().includes(e.toLocaleLowerCase()));
    this.contentsToShow = this.contentsFilter.slice(0, 50)
  }

  showMore(){
    this.contentsToShow = this.contentsFilter.slice(0, this.contentsToShow.length+20)
  }

  loadMoviesData(){
    this.kodiApi.media.getMovies({ propoerties: ["director", "writer", "cast", "year", "genre"] }).subscribe(resp => {
      if(resp?.movies){
        this.contents = [];
        
        switch(this.router.url.split("/")[2]){

          case "directors":
            this.title = "library.directors"
            this.filterName = "Directors"
            resp.movies.forEach(e => {
              e.director?.map(d => this.contents.push(d))
            })
            break;
          case "writers":
            this.title = "library.writers"
            this.filterName = "Writers"
            resp.movies.forEach(e => {
              e.writer?.map(d => this.contents.push(d))
            })
            break;
          case "genres":
              this.title = "library.genres"
              this.filterName = "Genres"
              resp.movies.forEach(e => {
                e.genre?.map(d => this.contents.push(d))
              })
              break;
          case "actors":
            this.title = "library.actors"
            this.filterName = "Actors"
            resp.movies.forEach(e => {
              e.cast?.map(d => this.contents.push(d.name))
            })
            break;
          case "years":
              this.title = "library.years"
              this.filterName = "Years"
              resp.movies.forEach(e => {
                this.contents.push(e.year?.toString() ?? "")
              })
              break;
        }

        //remove duplicate
        this.contents = this.contents.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        })

        this.contents.sort()
        this.isLoading = false;
        this.searchTextValue = "";
        this.contentsFilter = this.contents;
        this.contentsToShow = this.contents.slice(0, 50)

      }
    })
  }

  loadTvShowsData(){
    this.kodiApi.media.getTvShows({ propoerties: ["cast", "year", "genre"] }).subscribe(resp => {
      if(resp?.tvshows){
        this.contents = [];
        
        switch(this.router.url.split("/")[2]){

          case "genres":
              this.title = "library.genres"
              this.filterName = "Genres"
              resp.tvshows.forEach(e => {
                e.genre?.map(d => this.contents.push(d))
              })
              break;
          case "actors":
            this.title = "library.actors"
            this.filterName = "Actors"
            resp.tvshows.forEach(e => {
              e.cast?.map(d => this.contents.push(d.name))
            })
            break;
          case "years":
              this.title = "library.years"
              this.filterName = "Years"
              resp.tvshows.forEach(e => {
                this.contents.push(e.year?.toString() ?? "")
              })
              break;
        }

        //remove duplicate
        this.contents = this.contents.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        })

        this.contents.sort()
        this.isLoading = false;
        this.searchTextValue = "";
        this.contentsFilter = this.contents;
        this.contentsToShow = this.contents.slice(0, 50)

      }
    })
  }

}
