import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

export enum STORAGE_KEYS {
  websocket_port = 'websocket_port',
  websocket_address = 'websocket_addr',
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public setData(key: string, value: any){
    this.storage.set(key, value);
  }

  public getData(key: string) : any {
    return this.storage.get(key);
  }

  public removeData(key: string){
    return this.storage.remove(key);
  }

}
