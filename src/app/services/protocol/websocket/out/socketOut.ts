export abstract class SocketOut {

    static id:string = "default";

    method = "";
    params: any = {};

    constructor(){
        
    }

    handle(data: any){
        
    }

    setParams(params: any){
        this.params = params;
    }  

}