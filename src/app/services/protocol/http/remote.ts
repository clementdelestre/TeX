import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { HttpRequestData } from "./http";

export class RemoteRequest extends HttpRequestData {

    private cecAddonID = "script.json-cec";

    constructor(http:HttpClient){
        super(http)
    }

    inputBack(){
        const req = this.getRequestParams("inputback", "Input.Back", {})   
        this.makePostRequest(req).subscribe();
    }

    inputDown(){
        const req = this.getRequestParams("inputdown", "Input.Down", {})   
        this.makePostRequest(req).subscribe();
    }

    inputExecuteAction(action: string){
        const req = this.getRequestParams("inputexecuteaction", "Input.ExecuteAction", {"action": action })   
        this.makePostRequest(req).subscribe();
    }

    inputHome(){
        const req = this.getRequestParams("inputhome", "Input.Home", {})   
        this.makePostRequest(req).subscribe();
    }

    inputInfo(){
        const req = this.getRequestParams("inputinfo", "Input.Info", {})   
        this.makePostRequest(req).subscribe();
    }

    inputLeft(){
        const req = this.getRequestParams("inputleft", "Input.Left", {})   
        this.makePostRequest(req).subscribe();
    }

    inputRight(){
        const req = this.getRequestParams("inputright", "Input.Right", {})   
        this.makePostRequest(req).subscribe();
    }

    inputSelect(){
        const req = this.getRequestParams("inputselect", "Input.Select", {})   
        this.makePostRequest(req).subscribe();
    }

    inputSendText(){
        // const req = this.getRequestUrl("inputback", "Input.Back", {})   
        // return this.makeGetRequest(req);
    }

    inputUp(){
        const req = this.getRequestParams("inputup", "Input.Up", {})   
        this.makePostRequest(req).subscribe();
    }

    sendText(text:string){
        const req = this.getRequestParams("sendText", "Input.SendText", {"text" : decodeURIComponent(text),"done" : true})   
        this.makePostRequest(req).subscribe();
    }

    cecCommand(command: string) {
        const req = this.getRequestParams("cec", "Addons.ExecuteAddon", { "addonid": this.cecAddonID, "params": { "command": command } })
        this.makePostRequest(req).subscribe();
    }
    
    cecEnabled(): Observable<any> {
        const req = this.getRequestParams("cec", "Addons.GetAddonDetails", { "addonid": this.cecAddonID, "properties": ["enabled"] })
        return this.makePostRequest(req);
    }

}
