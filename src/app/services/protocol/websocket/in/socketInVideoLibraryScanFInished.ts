import { AppNotificationType } from "src/app/models/notification";
import { ApplicationService } from "src/app/services/application.service";
import { SocketIn } from "./socketIn";

export class SocketInOnVideoLibraryScanFinished extends SocketIn {

    static method:string = "VideoLibrary.OnScanFinished";

    constructor(private application: ApplicationService){
        super()
    }

    handle(data: any){
        this.application.showNotification("library.videoLibrary", "notification.scanFinished", AppNotificationType.success)
    }

}