import { AppNotificationType } from "src/app/models/notification";
import { ApplicationService } from "src/app/services/application.service";
import { SearchService } from "src/app/services/search.service";
import { SocketIn } from "./socketIn";

export class SocketInOnAudioLibraryCleanFinished extends SocketIn {

    static method:string = "AudioLibrary.OnCleanFinished";

    constructor(private application: ApplicationService, private searchService: SearchService){
        super()
    }

    handle(data: any){
        this.searchService.loadData();
        this.application.showNotification("library.audioLibrary", "notification.cleanFinished", AppNotificationType.success)
    }

}