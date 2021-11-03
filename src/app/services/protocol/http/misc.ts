import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {  catchError, map } from "rxjs/operators";
import { HttpRequestData } from "./http";

export class MiscRequest extends HttpRequestData {


  constructor(http:HttpClient){
    super(http);
  }
  
  sendRequest(request : string): Observable<string>{    
    const req = this.getApiUrl() + request
    return this.http.get<any>(req).pipe(
        map(response => { return response}),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        })
    );
  }

}