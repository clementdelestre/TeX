import { AppNotificationType } from "src/app/models/notification";
import { ApplicationService } from "src/app/services/application.service";
import { SocketIn } from "./socketIn";

export class SocketInOnAudioLibraryScanStarted extends SocketIn {

    static method:string = "AudioLibrary.OnScanStarted";

    constructor(private application: ApplicationService){
        super()
    }

    handle(data: any){
        this.application.showNotification("library.audioLibrary", "notification.scanStarted", AppNotificationType.success)
    }

}