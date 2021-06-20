import { PlayerService } from "../../../player.service";
import { SocketIn } from "./socketIn";

export class SocketInOnResume extends SocketIn {

    static method:string = "Player.OnResume";

    constructor(private player:PlayerService){
        super()
    }

    handle(data: any){
        this.player.getPlayerFromId(data.player.playerid)?.onPlayPause(true);
    }

}