import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class EstadoService{
    myApi = "https://webmicfx.arashi.solutions/FGR/WsEdo.p";

    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient){}
    
    
    public GetAll(): Observable<any>
    {
        let body = new URLSearchParams();
        /*body.set('ACCION', 'Consul');
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        
        return this.http.get(this.myApi);
        
    }
    

    
}