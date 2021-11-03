import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { heightAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
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

  constructor(public searchService: SearchService, private elementRef: ElementRef) { }

  ngOnInit(): void {

  }

  modelChangeFn(e:any){
    
    this.searchService.textSearch = e;

    if(e != ""){
      this.searchService.openSearchPage()
    } else {
      this.searchService.closeSearchPage()
    }

    
  }

  openSearch(){

  }

  onBlur(){

  }

}