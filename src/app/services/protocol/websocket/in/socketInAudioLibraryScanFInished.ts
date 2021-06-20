import { AppNotificationType } from "src/app/models/notification";
import { ApplicationService } from "src/app/services/application.service";
import { SocketIn } from "./socketIn";

export class SocketInOnAudioLibraryScanFinished extends SocketIn {

    static method:string = "AudioLibrary.OnScanFinished";

    constructor(private application: ApplicationService){
        super()
    }

    handle(data: any){
        this.application.showNotification("library.audioLibrary", "notification.scanFinished", AppNotificationType.success)
    }

}