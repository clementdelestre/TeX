import { AppNotificationType } from "src/app/models/notification";
import { ApplicationService } from "src/app/services/application.service";
import { SocketIn } from "./socketIn";

export class SocketInOnVideoLibraryCleanStarted extends SocketIn {

    static method:string = "VideoLibrary.OnCleanStarted";

    constructor(private application: ApplicationService){
        super()
    }

    handle(data: any){
        this.application.showNotification("library.videoLibrary", "notification.cleanStarted", AppNotificationType.success)
    }

}