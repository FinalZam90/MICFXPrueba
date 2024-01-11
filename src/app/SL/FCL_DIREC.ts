import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { EnteModel } from "../ML/FCL_ENTE";
import { DirecModel } from "../ML/FCL_DIREC";
@Injectable({
    providedIn: 'root'
})

export class DirecService{
    myApi = "https://webmicfx.arashi.solutions/FCL/WsDirec.p";

    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient){}
    
    
    public GetAll(Direc: DirecModel): Observable<any>
    {
        Direc.Ente.Num_Ente = 9732
        let body = new URLSearchParams();
        body.set('ACCION', "GetDir");
        body.set('NUM', Direc.Ente.Num_Ente.toString());
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public Add(Direc: DirecModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'AddDir');
        body.set('NUM', Direc.Ente.Num_Ente.toString());
        body.set('CP', Direc.Cve_CP.toString());
        body.set('MUNIC', Direc.Municipio.Cve_Munic.toString());
        body.set('NUMEXT', Direc.Num_Ext.toString());
        body.set('VIVI', Direc.Vivienda.Cve_Tidom.toString());
        body.set('PAIS', Direc.Pais.Cve_Pais.toString());
        body.set('LOCAL', Direc.Localidad.Cve_Local.toString());
        body.set('NUMINT', Direc.Num_Int.toString());
        body.set('RESEN', Direc.Num_Resen.toString());
        body.set('EDO', Direc.Estado.Cve_Estdo.toString());
        body.set('CNB', Direc.LocalCNB.Cve_LoPLD.toString());
        body.set('APPOS', Direc.Num_Appos.toString());
        body.set('CIUDAD', Direc.Des_Ciuda);
        body.set('COL', Direc.Nom_Colon);
        body.set('CALLE', Direc.Des_Calle);
        
        return this.http.post(this.myApi, body.toString(), this.options);
    }
    

    
}