import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { EstadoModel } from "../ML/FGR_ESTDO";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class MunicService{
    myApi = "https://webmicfx.arashi.solutions/FGR/WsMunic.p";

    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient){}
    
    
    public GetAll(Estdo: EstadoModel): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('CVEP', Estdo.Pais.Cve_Pais.toString());
        body.set('CVEE', Estdo.Cve_Estdo.toString());
        
        //body.set('ACCION', "ConDep");
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    

    
}