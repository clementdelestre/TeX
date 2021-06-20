import { PlayerService } from "../../../player.service";
import { SocketIn } from "./socketIn";

export class SocketInOnAVStart extends SocketIn {

    static method:string = "Player.OnAVStart";

    constructor(private player:PlayerService){
        super()
    }

    handle(data: any){        
        this.player.setDefaultPlayer();
    }

}