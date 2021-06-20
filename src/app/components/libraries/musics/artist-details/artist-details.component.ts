import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fastFadeAnimation, openCloseAnimation } from 'src/app/models/appAnimation';
import { Filter, FilterOperatorList } from 'src/app/models/filter';
import { AudioDetailsAlbum, AudioDetailsArtist, AudioDetailsSong } from 'src/app/models/kodiInterfaces/audio';
import { ListFilterFieldsAlbums, ListFilterFieldsSong } from 'src/app/models/kodiInterfaces/listFilter';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-musics-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
  animations: [
    fastFadeAnimation,
    openCloseAnimation
  ]
})
export class ArtistDetailsComponent implements OnInit {

  artist: AudioDetailsArtist | undefined;
  albums: AudioDetailsAlbum[] = [];
  songs: AudioDetailsSong[] = [];

  artistThumb = "";
  artistFanart = "";

  showDescription = false;

  constructor(private kodiApi:KodiApiService, private router:Router, private player: PlayerService) { }

  ngOnInit(): void {
    this.getArtist(parseInt(this.router.url.split("/")[3]));
  }

  getArtist(artistid: number){
    this.kodiApi.media.getArtistDetails(artistid).subscribe(resp => {
      this.artist = resp;
      this.getArtistImages();
      this.getAlbums();
      this.getSongs();
    });
  }

  getArtistImages(){
    if(this.artist?.art?.thumb){
      this.kodiApi.file.getPreparedFileUrl(this.artist.art.thumb).subscribe(resp => {
        this.artistThumb = resp;
      })
    }
    
    if(this.artist?.fanart){
      this.kodiApi.file.getPreparedFileUrl(this.artist.fanart).subscribe(resp => {
        this.artistFanart = resp;
      })
    }  
  }

  getAlbums(){

    const artistFilter: Filter = {
      field: ListFilterFieldsAlbums.albumartist,
      operator: FilterOperatorList.is,
      value: this.artist?.artist
    } 

    this.kodiApi.media.getAlbums({filter: artistFilter}).subscribe(resp => {
      this.albums = resp.albums;
    })
  }

  getSongs(){

    const albumFilter: Filter = {
      field: ListFilterFieldsSong.albumartist,
      operator: FilterOperatorList.is,
      value: this.artist?.artist
    } 

    this.kodiApi.media.getSongs({filter: albumFilter}).subscribe(resp => {
      this.songs = resp.songs;
    })
  }

  getSongGenres(): string {
    return this.artist?.songgenres?.map(genre => genre.title).join(", ") ?? "";
  }

  toggleDescription(){
    this.showDescription = !this.showDescription;
  }

  getEncodedGenre(genre: string){
    return encodeURIComponent(genre);
  }

}
