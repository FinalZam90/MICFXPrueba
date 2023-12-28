import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { EnteModel } from "../ML/FCL_ENTE";
import { DirecModel } from "../ML/FCL_DIREC";
import { RefmiModel } from "../ML/FCL_REFMI";
@Injectable({
    providedIn: 'root'
})

export class RefmiService{
    myApi = "https://webmicfx.arashi.solutions/FGR/WsRefmi.p";

    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient){}
    
    
    public GetAll(Refmi: RefmiModel): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetById');
        body.set('NUM', Refmi.Ente.Num_Ente.toString());
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        this.http.get(this.myApi).subscribe((r) => {console.log(r)});
        return this.http.get(this.myApi);
        
    }
    public Add(Refmi: RefmiModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'Add');
        body.set('NUM', Refmi.Ente.Num_Ente.toString());
        body.set('ANCO', Refmi.Num_AnoCo.toString());
        body.set('CONT', Refmi.Contador.toString());
        body.set('RESP1', Refmi.Cve_Respr[0].toString());
        body.set('RESP2', Refmi.Cve_Respr[1].toString());
        body.set('RESP3', Refmi.Cve_Respr[2].toString());
        body.set('RESP4', Refmi.Cve_Respr[3].toString());
        body.set('NOM', Refmi.Nom_Refer);
        body.set('DIREC', Refmi.Des_Dirre);
        body.set('NUMTEL', Refmi.Num_TelRe);
        body.set('COMEN', Refmi.Des_Comen);
     
        
        
        return this.http.post(this.myApi, body.toString(), this.options);
    }
    

    
}