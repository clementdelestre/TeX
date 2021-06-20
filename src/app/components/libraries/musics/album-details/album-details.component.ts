import { Component, OnInit } from '@angular/core';
import { AudioDetailsAlbum, AudioDetailsSong } from 'src/app/models/kodiInterfaces/audio';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { Location } from '@angular/common'
import { Router } from '@angular/router';
import { Filter, FilterOperatorList } from 'src/app/models/filter';
import { ListFilterFieldsSong } from 'src/app/models/kodiInterfaces/listFilter';
import { PlaylistItem } from 'src/app/models/kodiInterfaces/playlist';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-musics-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

  album!: AudioDetailsAlbum;
  albumSongs: AudioDetailsSong[] = [];

  albumThumb = "";
  albumFanart = "";

  showDisk = 1;
  disks:number[] = [];

  constructor(private kodiApi:KodiApiService, private router:Router, private player: PlayerService) { }

  ngOnInit(): void {
    this.getAlbumDetails(parseInt(this.router.url.split("/")[3]));
  }

  getAlbumDetails(albumid: number){

    this.kodiApi.media.getAlbumDetails(albumid).subscribe(resp => {
      this.album = resp;
      for(let x = 0;x<(this.album.totaldiscs ?? 1);x++){
        this.disks.push(x+1);
      }
      this.getAlbumSongs();
      this.getAlbumImages();
    });

  }

  getAlbumSongs(){

    const albumFilter: Filter = {
      field: ListFilterFieldsSong.album,
      operator: FilterOperatorList.is,
      value: this.album.title
    } 

    this.kodiApi.media.getSongs({filter: albumFilter}).subscribe(resp => {
      this.albumSongs = resp.songs.filter(s => s.disc == this.showDisk);
    })
  }

  getAlbumImages(){
    if(this.album.art && this.album.art['artist.thumb'])
    this.kodiApi.file.getPreparedFileUrl(this.album.art['artist.thumb']).subscribe(resp => {
      this.albumThumb = resp;
    })
    if(this.album.fanart)
    this.kodiApi.file.getPreparedFileUrl(this.album.fanart).subscribe(resp => {
      this.albumFanart = resp;
    })
  }
  
  async playAlbum(){

    this.kodiApi.playlist.clear(0)

    let items: PlaylistItem[] = [];

    this.albumSongs.forEach(song => {
      const item: PlaylistItem = {
        songid: song.songid
      }
      items.push(item);
    });

    await this.kodiApi.playlist.add(0, items);
    this.player.openPlaylist(0);  
  }

  changeDisk(disk: number){
    this.showDisk = disk;
    this.getAlbumSongs();
  }

  getEncodedGenre(genre: string){
    return encodeURIComponent(genre);
  }

}
