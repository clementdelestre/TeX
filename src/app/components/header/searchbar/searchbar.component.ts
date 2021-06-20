import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { heightAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  animations: [
    openCloseAnimation,
    heightAnimation
  ]
})
export class SearchbarComponent implements OnInit {

  constructor(private kodiApi: KodiApiService, public searchService: SearchService, private elementRef: ElementRef) { }

  displaySearchBox = false;
  searchTextValue = ""

  filtersFieldList: FiltersFieldList[] = [];
  
  displayField = "";


  ngOnInit(): void {
    this.searchTextValue = this.searchService.textSearch;

    this.kodiApi.media.getFiltersValue().then(resp => {

      const years: FiltersFieldList = {
        field: "year",
        values: resp.year
      };

      this.filtersFieldList.push(years)

      const genres: FiltersFieldList = {
        field: "genre",
        values: resp.genre
      };

      this.filtersFieldList.push(genres)
    })
  }

  onBlur(){
    // this.displaySearchBox = false;
  }

  openSearch(){
    this.displaySearchBox = true;
  }

  closeSearch(){
    this.displaySearchBox = false;
  }

  modelChangeFn(e:any){
    this.searchTextValue = e;

    if(e != ""){
      this.displaySearchBox = true;
    } else {
      this.close();
    }

    this.searchService.textSearch = e;
    this.searchService.search();  
  }

  close(){
    this.displaySearchBox = false;
    this.displayField = "";
  }

  toggleDisplayField(field: string){
    if(this.displayField == field){
      this.displayField = "";
    } else {
      this.displayField = field;
    }
    
  }

  isFilterEnabled(field: string, value: string){
    return this.searchService.selectedFilter.filter(filter => filter.field == field && filter.value == value).length != 0
  }

  toggleSearchMovies(value: boolean){
    this.searchService.moviesSearch = value;
    this.searchService.search();
  }

  toggleSearchTVShows(value: boolean){
    this.searchService.tvshowsSearch = value;
    this.searchService.search();
  }

  toggleSearchSongs(value: boolean){
    this.searchService.songsSearch = value;
    this.searchService.search();
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(target: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.close()
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(event.key == "Enter"){
      this.searchService.search();
      this.close()
    }
  }

}

export interface FiltersFieldList {
  field: string,
  values: any[]
}
