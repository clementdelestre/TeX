import { Injectable, Type } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll, delay } from 'rxjs/operators';
import { EMPTY, of, Subject } from 'rxjs';
import { SocketIn } from './protocol/websocket/in/socketIn';
import { SocketInOnResume } from './protocol/websocket/in/socketInOnResume';
import { SocketInOnPause } from './protocol/websocket/in/socketInOnPause';
import { SocketOut } from './protocol/websocket/out/socketOut';
import { PlayerService } from './player.service';
import { SocketInOnSeek } from './protocol/websocket/in/socketInOnSeek';
import { ApplicationService } from './application.service';
import { SocketInApplicationOnVolumeChanged } from './protocol/websocket/in/socketInApplicationOnVolumeChanged.ts';
import { SocketInOnAVStart } from './protocol/websocket/in/socketInOnAVStart';
import { SocketInOnStop } from './protocol/websocket/in/socketInOnStop';
import { LocalStorageService, STORAGE_KEYS } from './local-storage.service';
import { SocketInOnVideoLibraryScanFinished } from './protocol/websocket/in/socketInVideoLibraryScanFInished';
import { SocketInOnVideoLibraryCleanStarted } from './protocol/websocket/in/socketInVideoLibraryCleanStarted';
import { SocketInOnVideoLibraryCleanFinished } from './protocol/websocket/in/socketInVideoLibraryCleanFInished';
import { SocketInOnAudioLibraryScanStarted } from './protocol/websocket/in/socketInAudioLibraryScanStarted';
import { SocketInOnAudioLibraryScanFinished } from './protocol/websocket/in/socketInAudioLibraryScanFInished';
import { SocketInOnAudioLibraryCleanStarted } from './protocol/websocket/in/socketInAudioLibraryCleanStarted';
import { SocketInOnAudioLibraryCleanFinished } from './protocol/websocket/in/socketInAudioLibraryCleanFInished';
import { SocketInOnVideoLibraryScanStarted } from './protocol/websocket/in/socketInVideoLibraryScanStarted';
import { SearchService } from './search.service';
import { SocketOutRestart } from './protocol/websocket/out/socketOutRestart';
import { AppNotificationType } from '../models/notification';


@Injectable({
  providedIn: 'root'
})
export class KodiwebsocketService {

  private socket!: WebSocket;
  private messagesSubject = new Subject();

  private socketHandlerIn:Map<string, SocketIn> = new Map();
  private socketHandlerOut:Map<string, SocketOut> = new Map();

  constructor(private application: ApplicationService, private storageService: LocalStorageService, private searchService: SearchService) {  

    this.registerHandlers();

    this.messagesSubject.pipe(<any>switchAll(), catchError(e => { throw e })).subscribe((message:any) => {
      const data = JSON.parse(message);
      if(data.error){
        this.application.showNotification('notification.error', data.error.message, AppNotificationType.error);
      }
      if(data.method){    
        if(this.socketHandlerIn.has(data.method)){
          this.socketHandlerIn.get(data.method)?.handle(data.params.data)
        } 
      } else if(data.id){
        if(this.socketHandlerOut.has(data.id)){
          this.socketHandlerOut.get(data.id)?.handle(data.result)
        } 
      }
    });

    this.connect() 
  }

  private getSocketUrl(): string {
    return window.location.protocol.replace("http","ws")+"//" + this.getAddress() + ":" + this.getPort() + "/jsonrpc"
  }

  public connect(): void {
  
    if (!this.socket || !(this.socket.readyState == this.socket.OPEN || this.socket.readyState == this.socket.CONNECTING)) {
      this.socket = this.getWebSocket();

      this.socket.onmessage = (event) => { 
        this.messagesSubject.next(of(event.data));
      }

      this.socket.onopen = (event) => {
        console.log("websocket connection opened");
      }

      this.socket.onerror = (event) => {
        console.log("websocket connection closed");
      }

    }
  }

  private getWebSocket() : WebSocket {
    let socket = new WebSocket(this.getSocketUrl())
    return socket;
  }

  private registerHandlers(){
    this.socketHandlerIn.set(SocketInApplicationOnVolumeChanged.method, new SocketInApplicationOnVolumeChanged(this.application));

    this.socketHandlerIn.set(SocketInOnVideoLibraryScanStarted.method, new SocketInOnVideoLibraryScanStarted(this.application));
    this.socketHandlerIn.set(SocketInOnVideoLibraryScanFinished.method, new SocketInOnVideoLibraryScanFinished(this.application, this.searchService));
    this.socketHandlerIn.set(SocketInOnVideoLibraryCleanStarted.method, new SocketInOnVideoLibraryCleanStarted(this.application));
    this.socketHandlerIn.set(SocketInOnVideoLibraryCleanFinished.method, new SocketInOnVideoLibraryCleanFinished(this.application, this.searchService));

    this.socketHandlerIn.set(SocketInOnAudioLibraryScanStarted.method, new SocketInOnAudioLibraryScanStarted(this.application));
    this.socketHandlerIn.set(SocketInOnAudioLibraryScanFinished.method, new SocketInOnAudioLibraryScanFinished(this.application, this.searchService));
    this.socketHandlerIn.set(SocketInOnAudioLibraryCleanStarted.method, new SocketInOnAudioLibraryCleanStarted(this.application));
    this.socketHandlerIn.set(SocketInOnAudioLibraryCleanFinished.method, new SocketInOnAudioLibraryCleanFinished(this.application, this.searchService));

    this.socketHandlerOut.set(SocketOutRestart.method, new SocketOutRestart())
  }

  public registerPlayerHandlers(player:PlayerService){
    this.socketHandlerIn.set(SocketInOnResume.method, new SocketInOnResume(player))
    this.socketHandlerIn.set(SocketInOnPause.method, new SocketInOnPause(player))
    this.socketHandlerIn.set(SocketInOnSeek.method, new SocketInOnSeek(player))
    this.socketHandlerIn.set(SocketInOnStop.method, new SocketInOnStop(player))
    this.socketHandlerIn.set(SocketInOnAVStart.method, new SocketInOnAVStart(player))
  }

  public sendRequest(socketOutId: string, params:any) {    
    if(this.socketHandlerOut.get(socketOutId)){
      this.socketHandlerOut.get(socketOutId)?.setParams(params);
      this.makeRequest(socketOutId, <SocketOut>this.socketHandlerOut.get(socketOutId));
    }
  }

  private makeRequest(id:string, req: SocketOut){
    
    const request:string = JSON.stringify({
      "jsonrpc" : "2.0",
      "id" : id,
      "method" : id,
      "params" : req.params
    });
   
    if(this.socket.readyState == this.socket.OPEN){
      this.socket.send(request)
    } else {
      this.application.showNotification('notification.error', "notification.commandError", AppNotificationType.error);
    }
    
  }

  close() {
    this.socket.close();
  }

  public isConnected(): boolean {
    return this.socket.readyState == this.socket.OPEN;
  }

  public getAddress(): string {
    return this.storageService.getData(STORAGE_KEYS.websocket_address) ?? window.location.hostname;
  }

  public getPort(): number {
    return this.storageService.getData(STORAGE_KEYS.websocket_port) ?? 9090;
  }

  public setAddress(addr: string){
    this.storageService.setData(STORAGE_KEYS.websocket_address, addr);
  }

  public setPort(port: number){
    this.storageService.setData(STORAGE_KEYS.websocket_port, port);
  }
   
}
