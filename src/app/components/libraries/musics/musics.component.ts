import { Component, OnInit } from '@angular/core';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { KodiApiService } from 'src/app/services/kodi-api.service';

export enum Page {
  home = "home",
  musics = "musics",
  albums = "albums",
  albumdetails = "album",
  artists = "artists",
  artistdetails = "artist",
  genres = "genres",
  genredetails = "genre"
}

@Component({
  selector: 'app-musics',
  templateUrl: './musics.component.html',
  styleUrls: ['./musics.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class MusicsComponent implements OnInit {

  page:Page = Page.home;

  constructor(private location:Location, private router: Router, private kodiApi: KodiApiService) { }

  ngOnInit(): void {

    this.displayPage(this.router.url.split("/")[2] ?? '');

    this.location.onUrlChange(() => {
      this.displayPage(this.router.url.split("/")[2] ?? '')
    });
  }

  isPage(page: string): boolean {
    return page == this.page;
  }

  navigate(url: string){
    let page = url;
    if(url == this.page){
      page = "";
    }
    this.router.navigate(["musics/" + page]);
    this.displayPage(page);
  }

  displayPage(page: string){
    switch(page){
      case "albums":
        this.page = Page.albums;
        break;
      case "album":
        this.page = Page.albumdetails;
        break;
      case "artists":
        this.page = Page.artists;
        break;
      case "artist":
          this.page = Page.artistdetails;
          break;
      case "musics":
        this.page = Page.musics;
        break;
      case "musics":
          this.page = Page.musics;
          break;
      case "genres":
        this.page = Page.genres;
        break;
      case "genre":
          this.page = Page.genredetails;
          break;
      default:
        this.page = Page.home;
    }
  }

}
