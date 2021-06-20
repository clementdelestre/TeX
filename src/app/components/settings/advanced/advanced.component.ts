import { Component, OnInit } from '@angular/core';
import { KodiwebsocketService } from 'src/app/services/kodiwebsocket.service';
import { LocalStorageService, STORAGE_KEYS } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-settings-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {

  constructor(public kodiWebSocketService: KodiwebsocketService, private localStorage: LocalStorageService,) { }

  ngOnInit(): void {
    this.webSocketAddrValue = this.kodiWebSocketService.getAddress();
    this.webSocketPortValue = this.kodiWebSocketService.getPort();
  }

   //WebSocket

   webSocketAddrValue = ""
   webSocketAddrChange(e:any){
     this.webSocketAddrValue = e;
   }
 
   webSocketResetAddr(){
     this.localStorage.removeData(STORAGE_KEYS.websocket_address);
     this.webSocketAddrValue = this.kodiWebSocketService.getAddress();
     this.webSocketSaveChange();
   }
 
   webSocketPortValue = 0
   webSocketPortChange(e:any){
     this.webSocketPortValue = e;
   }
 
   webSocketResetPort(){
     this.localStorage.removeData(STORAGE_KEYS.websocket_port);
     this.webSocketPortValue = this.kodiWebSocketService.getPort();
     this.webSocketSaveChange();
   }
 
   webSocketSaveChange(){
     this.kodiWebSocketService.setAddress(this.webSocketAddrValue);
     this.kodiWebSocketService.setPort(this.webSocketPortValue);
     this.kodiWebSocketService.close();
     this.kodiWebSocketService.connect();
   }

}
