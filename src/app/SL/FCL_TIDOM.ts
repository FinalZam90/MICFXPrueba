import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class TidomService
{
    myApi = "https://webmicfx.arashi.solutions/FCL/WsTidom.p";

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
    

    
}