import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";

import { UsuarModel } from "../ML/FAD_USUAR";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Injectable({
    providedIn: 'root'
})

export class UsuarService{
    myApi = "https://webmicfx.arashi.solutions/FAD/WsUsuar.p"
    
    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      
    }
    constructor(private http:HttpClient, private cook:CookieService){}
 
    
    
    public GetAll():Observable<any>
    {
        let body = new URLSearchParams();
        //body.set('LCVE_DEPTO', CveDepto);
        //body.set('LCVE_USUAR', Cve);
        
        body.set('ACCION', "All");
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public GetBy(UsuarBusq: UsuarModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', "Params");
        body.set('SUCUR', UsuarBusq.Cve_Sucur.toString());
        body.set('GRUSU', UsuarBusq.Cve_Grusu.toString());
        body.set('NOM', UsuarBusq.Nom_Usuar);
        
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public GetById(UsuarBusq: UsuarModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', "Id");
        body.set('USUAR', UsuarBusq.Cve_Usuar.toString());
        
        
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public Form(UsuarForm: UsuarModel)
    {
        let ban1;
        let ban2;
        if(UsuarForm.Ban_Bloq == true)
        {
            ban1 = "YES"
        }
        else
        {
            ban1= "NO"
        }
        if(UsuarForm.Ban_Inac == true)
        {
            ban2 = "YES"
        }
        else
        {
            ban2= "NO"
        }
        if(UsuarForm.Pass_1 == undefined)
        {
            UsuarForm.Pass_1 = ""
        }
        console.log(UsuarForm.Pass_1)
        let body = new URLSearchParams();
        body.set('ACCION', "Form");
        body.set('CVEUS', UsuarForm.Cve_Usuar.toString());
        body.set('NOMUS', UsuarForm.Ente.Nom_Com);
        body.set('CARGO', UsuarForm.Des_Cargo);
        body.set('PASS', ""+ UsuarForm.Pass_1);
        body.set('TEL', UsuarForm.Num_Tel);
        body.set('ENTE', UsuarForm.Ente.Num_Ente.toString());
        body.set('SUCUR', UsuarForm.Sucur.Cve_Sucur.toString());
        body.set('DEPTO', UsuarForm.Depto1.Cve_Depto.toString());
        body.set('GRUSU', UsuarForm.Grusu.Cve_Grusu.toString());
        body.set('CAD', UsuarForm.Pass_Cad.toString());
        body.set('NIVEL', UsuarForm.Num_Nivel.toString());
        body.set('BLOQ', ban1);
        body.set('INAC', ban2);
        console.log(body.toString())
        
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    
}