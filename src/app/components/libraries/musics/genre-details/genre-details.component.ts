import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { openCloseAnimation } from 'src/app/models/appAnimation';
import { Filter, FilterOperatorList } from 'src/app/models/filter';
import { AudioDetailsAlbum, AudioDetailsArtist, AudioDetailsSong } from 'src/app/models/kodiInterfaces/audio';
import { ListFilterFieldsAlbums, ListFilterFieldsSong, ListFilterFiledArtist } from 'src/app/models/kodiInterfaces/listFilter';
import { KodiApiService } from 'src/app/services/kodi-api.service';

@Component({
  selector: 'app-musics-genre-details',
  templateUrl: './genre-details.component.html',
  styleUrls: ['./genre-details.component.scss'],
  animations: [
    openCloseAnimation
  ]
})
export class GenreDetailsComponent implements OnInit {

  genre: string = "";
  artists: AudioDetailsArtist[] = [];
  albums: AudioDetailsAlbum[] = [];
  songs: AudioDetailsSong[] = [];

  constructor(private kodiApi:KodiApiService, private router:Router) { }

  ngOnInit(): void {
    this.genre = decodeURIComponent(this.router.url.split("/")[3]);
    this.getArtists();
    this.getAlbums();
    this.getSongs();
  }

  getArtists(){

    const filter: Filter = {
      field: ListFilterFiledArtist.genre,
      operator: FilterOperatorList.is,
      value: this.genre
    } 

    this.kodiApi.media.getArtists({filter:filter}).subscribe(resp => {
      this.artists = resp.artists;
    })
  }

  getAlbums(){
    const filter: Filter = {
      field: ListFilterFieldsAlbums.genre,
      operator: FilterOperatorList.is,
      value: this.genre
    } 

    this.kodiApi.media.getAlbums({filter:filter}).subscribe(resp => {
      this.albums = resp.albums;
    })
  }

  getSongs(){
    const filter: Filter = {
      field: ListFilterFieldsSong.genre,
      operator: FilterOperatorList.is,
      value: this.genre
    } 

    this.kodiApi.media.getSongs({filter:filter}).subscribe(resp => {
      this.songs = resp.songs;
    })
  }

}
