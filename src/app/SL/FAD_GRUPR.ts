import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { FADGrupr } from "../ML/Gupr";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Injectable({
    providedIn: 'root'
})

export class GruprService{
    myApi = "/prueba/FGR/WsConProce.p";
    myApiGrupr = "/prueba/FAD/WsGrupr.p";
    myApiLogin = "https://webmicfx.arashi.solutions/FAD/WsLogin2.p"
    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient, private cook:CookieService){}
    
    public Login(Usuar: any)
    {
        var date = new Date();
        date.setTime(date.getTime()+(30*1000));
        let body = new URLSearchParams();
        //body.set('LCVE_DEPTO', CveDepto);
        body.set('LCVE_USUAR', Usuar.Cve_Usuar);
        body.set('PASS', Usuar.Password);
        body.set('EMP', Usuar.Emp);
        //body.set('ACCION', "ConDep");
       
        return this.http.post(this.myApiLogin, body.toString(), this.options);
        
    }
    public Cookie(Usuar: any)
    {
        var date = new Date();
        date.setTime(date.getTime()+(30*1000));
        let body = new URLSearchParams();
        //body.set('LCVE_DEPTO', CveDepto);
        body.set('LCVE_USUAR', Usuar.Cve_Usuar);
        body.set('PASS', Usuar.Password);
        body.set('EMP', Usuar.Emp.toString())
        //body.set('ACCION', "ConDep");
        this.cook.set("Login"+Usuar.Cve_Usuar, body.toString(), date, '', '', true)
        console.log(this.cook.get('Login'+Usuar.Cve_Usuar))
        console.log(this.cook.getAll())
        
    }
    public GetAll(Cve:string)
    {
        let body = new URLSearchParams();
        //body.set('LCVE_DEPTO', CveDepto);
        body.set('LCVE_USUAR', Cve);
        
        //body.set('ACCION', "ConDep");
      
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }

    
}