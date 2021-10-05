import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fastFadeAnimation } from 'src/app/models/appAnimation';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { Location} from '@angular/common';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-movies-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  animations: [
    fastFadeAnimation
  ]
})
export class MoviesCategoryComponent implements OnInit {

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

    this.kodiApi.media.getMovies({ propoerties: ["director", "writer", "cast", "year"] }).subscribe(resp => {
      if(resp?.movies){
        this.contents = [];
        
        switch(this.router.url.split("/")[2]){

          case "directors":
            this.title = "library.directors"
            this.filterName = "Directors"
            resp.movies.forEach(e => {
              e.director?.map(d => this.contents.push(d))
            })
            console.log(this.contents)
            break;
          case "writers":
            this.title = "library.writers"
            this.filterName = "Writers"
            resp.movies.forEach(e => {
              e.writer?.map(d => this.contents.push(d))
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

}
