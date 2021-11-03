import { Component, OnInit } from '@angular/core';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { AudioDetailsAlbum } from 'src/app/models/kodiInterfaces/audio';
import { ListSort, ListSortMethod, ListSortOrder } from 'src/app/models/kodiInterfaces/listItem';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-musics-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class MusicsHomeComponent implements OnInit {

  recentlyPlayedAlbums: AudioDetailsAlbum[] = [];
  recentlyAddedAlbums: AudioDetailsAlbum[] = [];
  mostPlayedAlbums: AudioDetailsAlbum[] = [];

  constructor(private kodiApi: KodiApiService) { }

  ngOnInit(): void {
    this.getRecentlyPlayedAlbums();
    this.getRecentlyAddedAlbums();
    this.getMostPlayedAlbums();
  }

  getRecentlyPlayedAlbums(){
    this.kodiApi.media.getRecentlyPlayedAlbums({}).subscribe((resp) => {
      if(resp?.albums)
        this.recentlyPlayedAlbums = resp.albums;
    });
  }

  getRecentlyAddedAlbums(){
    this.kodiApi.media.getRecentlyAddedAlbums({}).subscribe((resp) => {
      if(resp?.albums)
        this.recentlyAddedAlbums = resp.albums;
    });
  }

  getMostPlayedAlbums(){

    const playedSort:ListSort = {
      ignorearticle: true,  
      method: ListSortMethod.playcount, 
      order: ListSortOrder.descending
    };
    
    this.kodiApi.media.getAlbums({sort:playedSort}).subscribe((resp) => {
      if(resp?.albums)
        this.mostPlayedAlbums = resp.albums;
    });
  }

}
