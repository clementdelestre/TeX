import { AppNotificationType } from "src/app/models/notification";
import { ApplicationService } from "src/app/services/application.service";
import { SocketIn } from "./socketIn";

export class SocketInOnVideoLibraryCleanFinished extends SocketIn {

    static method:string = "VideoLibrary.OnCleanFinished";

    constructor(private application: ApplicationService){
        super()
    }

    handle(data: any){
        this.application.showNotification("library.videoLibrary", "notification.cleanFinished", AppNotificationType.success)
    }

}