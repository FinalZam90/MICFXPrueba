import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";

import { UsuarModel } from "../ML/FAD_USUAR";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Injectable({
    providedIn: 'root'
})

export class ModfeService{
    myApi = "https://webmicfx.arashi.solutions/FGR/WsModfe.p"
    myApi2 = '/prueba/FGR/WsModfe.p'
    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      
    }
    constructor(private http:HttpClient, private cook:CookieService){}
 
    public GetFecha()
    { 
        console.log(this.http.get('/prueba/FGR/WsModfe.p').subscribe)
        return this.http.get<any>(this.myApi2);
        
    }
    
}