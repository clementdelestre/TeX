import { PlayerService } from "../../../player.service";
import { SocketOut } from "./socketOut";

export class SocketOutRestart extends SocketOut {

    static method:string = "System.Reboot";

    constructor(){
        super()
    }


}