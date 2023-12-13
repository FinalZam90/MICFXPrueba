import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { FADGrupr } from "../ML/Gupr";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
@Injectable({
    providedIn: 'root'
})

export class GrusuService{
    myApi = "https://webmicfx.arashi.solutions/FAD/WsGrusu.p"
    
    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient, private cook:CookieService){}
    
    public GetAll() : Observable<any>
    {
        let body = new URLSearchParams();
        //body.set('LCVE_DEPTO', CveDepto);
        //body.set('LCVE_USUAR', Cve);
        
        //body.set('ACCION', "ConDep");
        this.http.get(this.myApi).subscribe((r) => {console.log(r)})
        return this.http.get(this.myApi);
        
    }

    
}