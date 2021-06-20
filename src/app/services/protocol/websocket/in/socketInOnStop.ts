import { PlayerService } from "../../../player.service";
import { SocketIn } from "./socketIn";

export class SocketInOnStop extends SocketIn {

    static method:string = "Player.OnStop";

    constructor(private player:PlayerService){
        super()
    }

    handle(data: any){
        this.player.onStop();
    }

}