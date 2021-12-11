import { AppNotificationType } from "src/app/models/notification";
import { ApplicationService } from "src/app/services/application.service";
import { SearchService } from "src/app/services/search.service";
import { SocketIn } from "./socketIn";

export class SocketInOnAudioLibraryScanFinished extends SocketIn {

    static method:string = "AudioLibrary.OnScanFinished";

    constructor(private application: ApplicationService, private searchService: SearchService){
        super()
    }

    handle(data: any){
        this.searchService.loadData();
        this.application.showNotification("library.audioLibrary", "notification.scanFinished", AppNotificationType.success)
    }

}