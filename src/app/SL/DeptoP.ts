import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Depto } from "../ML/FGR_DEPTO";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class DeptoService
{
    myApi1 = 'https://webmicfx.arashi.solutions/FAD/WsCnDept.p?LCVE_DEPTO=0&LCVE_USUAR=gfg&ACCION=ConDep';
    myApi2 = 'https://rickandmortyapi.com/api/character/1,100';
    myApi3 = 'https://webmicfx.arashi.solutions/FAD/WsCnDept.p'; 
    myApi4 = 'https://localhost:7122'
    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    
    
    constructor(private http:HttpClient){}
    
    /*
   public getJSON(): Observable<any> {
     return this.http.get(this.baseURL);
   }*/
    
   
    public getPruebas():Observable<any>
    {
        return this.http.get(this.myApi4+"/GetAll");
    }
    
    public GetById(CveDepto: any)
    {
      let body = new URLSearchParams();
      body.set('LCVE_DEPTO', CveDepto);
      body.set('LCVE_USUAR', "gfg");
      body.set('ACCION', "ConDep");
      
      return this.http.post(this.myApi3, body.toString(), this.options);
    }
    public Form(Depto: any)
    {
      let Def: string = "";
      if (Depto.Def_Depto == true) 
      {
        Def = "YES";
      }
      else
      {
        Def = "NO";
      }
      let body = new URLSearchParams();
      body.set('LCVE_DEPTO', Depto.Cve_Depto);
      body.set('LCVE_USUAR', "gfg");
      body.set('ACCION', "ActDep");
      
      body.set('DES_DEPTO', Depto.Des_Depto);
      
      body.set('DEF_DEPTO', Def);
      console.log(body.toString())
      return this.http.post<HttpResponse<any>>(this.myApi3, body.toString(), this.options);
    }
    
    
    public GetAll2()
    {
        let data  = ''
       return fetch(this.myApi1)
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
      
          data=myJson
       console.log(data)
        });
      
      
    }
}