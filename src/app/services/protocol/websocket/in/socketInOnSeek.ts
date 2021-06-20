import { PlayerService } from "../../../player.service";
import { SocketIn } from "./socketIn";

export class SocketInOnSeek extends SocketIn {

    static method:string = "Player.OnSeek";

    constructor(private player:PlayerService){
        super()
    }

    handle(data: any){
        this.player.getPlayerFromId(data.player.playerid)?.onSeek((data.player.time));
    }

}