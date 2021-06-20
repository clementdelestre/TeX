import { Component, Input, OnInit } from '@angular/core';
import { ListItemAll } from 'src/app/models/kodiInterfaces/listItem';
import { KodiApiService } from 'src/app/services/kodi-api.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-playlist-item',
  templateUrl: './playlist-item.component.html',
  styleUrls: ['./playlist-item.component.scss']
})
export class PlaylistItemComponent implements OnInit {

  @Input() item!: ListItemAll;
  @Input() position: number = 0;

  imageUrl: string = "";

  constructor(private kodiApi:KodiApiService, public player:PlayerService) { }

  ngOnInit(): void {

    let findUrl:string = "";

    if(this.item.type == "movie"){
      findUrl = this.item.art?.poster ?? "";
    }

    if(this.item.type == "episode"){
      findUrl = this.item.art?.thumb ?? "";
    }

    if(this.item.type == "song"){
      findUrl = this.item?.art?.["album.thumb"] ?? "";
    }

    if(findUrl != ""){
      this.kodiApi.file.getPreparedFileUrl(findUrl).subscribe((url) => {
        this.imageUrl = url;
      });
    }
    
  }

  goTo(event: any){
    if(!event.target.classList.contains('remove-file')){
      this.player.currentPlayer?.goTo(this.position);
    } 
  }

  removeItem(){

  }

}
