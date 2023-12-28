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
    myApi = "https://webmicfx.arashi.solutions/FGR/WsIdenti.p";

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
        this.http.get(this.myApi).subscribe((r) => {console.log(r)});
        return this.http.get(this.myApi);
        
    }
    public Add(EntId: EntIdModel)
    {
        let body = new URLSearchParams();
        ///body.set('ACCION', 'AddDir');
        body.set('NUM', EntId.Ente.Num_Ente.toString());
        body.set('TIP', EntId.Cve_TipId.toString());
        body.set('VENCI', EntId.An_Venci.toString());
        body.set('NUMIDENT', EntId.Num_Identi.toString());
        body.set('FECHA', EntId.Fec_AddRec);
        body.set('IDENT', EntId.Cve_Identi);
        
        
        return this.http.post(this.myApi, body.toString(), this.options);
    }
    

    
}