import { ApplicationService } from "../../../application.service";
import { PlayerService } from "../../../player.service";
import { SocketIn } from "./socketIn";

export class SocketInApplicationOnVolumeChanged extends SocketIn {

    static method:string = "Application.OnVolumeChanged";

    constructor(private application:ApplicationService){
        super()
    }

    handle(data: any){
        this.application.muted = data.muted;
        this.application.volume = data.volume;
    }

}