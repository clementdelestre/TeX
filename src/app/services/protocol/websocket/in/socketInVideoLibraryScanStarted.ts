import { AppNotificationType } from "src/app/models/notification";
import { ApplicationService } from "src/app/services/application.service";
import { SocketIn } from "./socketIn";

export class SocketInOnVideoLibraryScanStarted extends SocketIn {

    static method:string = "VideoLibrary.OnScanStarted";

    constructor(private application: ApplicationService){
        super()
    }

    handle(data: any){
        this.application.showNotification("library.videoLibrary", "notification.scanStarted", AppNotificationType.success)
    }

}