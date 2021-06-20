import { PlayerService } from "../../../player.service";
import { SocketIn } from "./socketIn";

export class SocketInOnPause extends SocketIn {

    static method:string = "Player.OnPause";

    constructor(private player:PlayerService){
        super()
    }

    handle(data: any){
        this.player.getPlayerFromId(data.player.playerid)?.onPlayPause(false);
    }

}