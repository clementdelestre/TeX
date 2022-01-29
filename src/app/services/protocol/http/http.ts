import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

export class HttpRequestData {

    private location = window.location;

    constructor(protected http:HttpClient){
        
    }

    protected getBaseUrl(): string {
        const port = this.location.port == "4200" ? "8080" : this.location.port; 
        return this.location.protocol + "//" + this.location.hostname + ":" + port + "/";
    }

    protected getApiUrl(): string {
        return this.getBaseUrl() + "jsonrpc?request=";
    }

    protected getRequestParams(id:string, method:string, params:any = {}): string{
        return JSON.stringify({
          "jsonrpc" : "2.0",
          "id" : id,
          "method" : method,
          "params" : params
        });
    }
    
    protected getRequestUrl(id:string, method:string, params:any = {}): string{
        return this.getApiUrl() + this.getRequestParams(id, method, params);
    }

    protected makePostRequest(req: string): Observable<any>{

        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}),
        }

        return this.http.post<any>(this.getBaseUrl() + "jsonrpc", req, httpOptions).pipe(
            map(response => { return response?.result ?? response?.error ?? "error"}),
            catchError((err, caught) => {
                console.error(err);
                throw err;
            })
        );
    }

    protected makeGetRequest(req: string): Observable<any>{
        return this.http.get<any>(req).pipe(
            map(response => { return response?.result ?? response?.error ?? "error"}),
            catchError((err, caught) => {
              console.error(err);
              throw err;
            })
        );
    }
}