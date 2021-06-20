import { Component, OnInit } from '@angular/core';
import { modalAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  animations: [
    openCloseAnimation,
    modalAnimation
  ]
})
export class SearchComponent implements OnInit {

  constructor(public searchService: SearchService,) { }

  ngOnInit(): void {
    this.searchService.search();
  }

}
