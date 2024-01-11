import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { EnteModel } from "../ML/FCL_ENTE";
import { DirecModel } from "../ML/FCL_DIREC";
import { EntIdModel } from "../ML/FCL_ENTID";
@Injectable({
    providedIn: 'root'
})

export class EntIdService{
    myApi = "https://webmicfx.arashi.solutions/FCL/WsIdenti.p";

    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient){}
    
    
    public GetAll(EnteId: EntIdModel): Observable<any>
    {
        EnteId.Ente.Num_Ente = 9732
        let body = new URLSearchParams();
        body.set('ACCION', 'GetById');
       
        body.set('NUM', EnteId.Ente.Num_Ente.toString());
     
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public GetTipId(): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetTip');
   
     
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public Add(EntId: EntIdModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'AddIdent');
        body.set('NUM', EntId.Ente.Num_Ente.toString());
        body.set('TIP', EntId.Cve_TipId.toString());
        body.set('VENCI', EntId.An_Venci.toString());
        body.set('NUMIDENT', EntId.Num_Identi.toString());
        body.set('FECHA', EntId.Fec_AddRec);
        body.set('IDENT', EntId.Cve_Identi);
        
        
        return this.http.post(this.myApi, body.toString(), this.options);
    }
    

    
}