import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { MunicModel } from "../ML/FGR_MUNIC";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class LocalService{
    myApi = "https://webmicfx.arashi.solutions/FGR/WsLocalidad.p";

    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient){}
    
    
    public GetAll(Munic: MunicModel): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('CVEP', Munic.Pais.Cve_Pais.toString());
        body.set('CVEE', Munic.Estado.Cve_Estdo.toString());
        body.set('CVEM', Munic.Cve_Munic.toString());
        
        //body.set('ACCION', "ConDep");
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    

    
}