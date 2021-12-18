import { AppNotificationType } from "src/app/models/notification";
import { ApplicationService } from "src/app/services/application.service";
import { SearchService } from "src/app/services/search.service";
import { SocketIn } from "./socketIn";

export class SocketInOnVideoLibraryScanFinished extends SocketIn {

    static method:string = "VideoLibrary.OnScanFinished";

    constructor(private application: ApplicationService, private searchService: SearchService){
        super()
    }

    handle(data: any){
        this.searchService.loadData();
        this.application.showNotification("library.videoLibrary", "notification.scanFinished", AppNotificationType.success)
    }

}