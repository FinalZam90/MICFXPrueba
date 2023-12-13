import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";

import { UsuarModel } from "../ML/FAD_USUAR";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Injectable({
    providedIn: 'root'
})

export class QuejaService{
    myApi = "https://webmicfx.arashi.solutions/FGR/WsQuejas.p"
    
    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      
    }
    constructor(private http:HttpClient, private cook:CookieService){}
 
    public Form(Razon: string)
    {
        
        let body = new URLSearchParams();
        body.set('RAZON', Razon);
      
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    
}