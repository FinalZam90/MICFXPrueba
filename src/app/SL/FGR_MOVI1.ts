import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class Movi1Service{
    myApi = "https://webmicfx.arashi.solutions/FGR/WsAudit.p";

    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient){}
    
    
    public getPruebas()
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'Consul');
        body.set('FECHA', '');
        body.set('ORACS', '');
        
        //body.set('ACCION', "ConDep");
      
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public GetByParams(MOVI: any)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'Consul');
        body.set('ORACS', MOVI.Cve_Oracs);
        body.set('FECHA', MOVI.Fec_Movim);
        
        //body.set('ACCION', "ConDep");
      
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public Login(MOVI: Movi1Model)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'Post');
        body.set('PROCE', 'Login');
        body.set('ORACS', MOVI.Cve_Oracs);
        body.set('USUAR', MOVI.Cve_Usuar);
        body.set('MESSAGE', MOVI.Message.message);
        body.set('PANTA', MOVI.Des_Panta);
        body.set('HORA', ''+MOVI.Num_Hora);
        body.set('LATIT', ''+MOVI.Latitud);
        body.set('LONGI', ''+MOVI.Longitud);
        body.set('IP', MOVI.Ip);
        //body.set('ACCION', "ConDep");
      
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }

    
}