import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { listFieldsFilesProperties } from "src/app/models/fieldsFiles";
import { ListItemFile } from "src/app/models/kodiInterfaces/listItem";
import { HttpRequestData } from "./http";

export class FileRequest extends HttpRequestData {

    constructor(http:HttpClient){
        super(http)
    }

    getPreparedFileUrl(url: string): Observable<string>{

        const req = encodeURI(this.getRequestUrl("preparedownload", "Files.PrepareDownload", {"path" : url}))
        return this.makeGetRequest(req).pipe(
          map(rep => { return this.getBaseUrl() + rep.details.path})
        )
    }
    
    getFileDetails(file: string, media: string = "files"): Observable<any>{
      let params = {
        "file" : encodeURIComponent(file),
        "media" : media,
        "properties": listFieldsFilesProperties,
      } 
      const req = this.getRequestUrl("getfiledetails", "Files.GetFileDetails", params)
      return this.makeGetRequest(req);
    }

}