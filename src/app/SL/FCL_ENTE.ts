import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { EnteModel } from "../ML/FCL_ENTE";
import { DirecModel } from "../ML/FCL_DIREC";

@Injectable({
    providedIn: 'root'
})

export class EnteService{
    myApi = "https://webmicfx.arashi.solutions/FCL/WsEnte.p";

    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient){}
    
    
    public GetAll(): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'ConTodos');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public GetEdoCiv(): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetEdoCiv');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public GetNivEst(): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetNivEstu');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public GetNivIng(): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetNivIng');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public GetGruso(): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetGruso');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public GetCNB(): Observable<any>
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetCNB');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        
        return this.http.post(this.myApi, body.toString(), this.options);
        
    }
    public MaPaso3(Ente: EnteModel, Direc: DirecModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'ManDirec');
        body.set('NUM', Ente.Num_Ente.toString());
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
    public MaPaso2(Ente: EnteModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'ManClie2');
        body.set('NUM', Ente.Num_Ente.toString())
        body.set('NIVES', Ente.Nives.Cve_Nives.toString());
        body.set('EDOCI', Ente.EdoCi.Tip_EdoCi);
        body.set('CNB', Ente.Aegen.Cve_Aegen.toString());
        body.set('ING', Ente.Ingr.Des_Nivel);
        body.set('ECO', Ente.Gruso.Cve_Gruso.toString());
        body.set('EMAIL', Ente.Email);
        body.set('DEP', Ente.NumDependientes.toString());
        body.set('TEL1', Ente.Tel_1);
        body.set('TEL2', Ente.Tel_2);
        body.set('TEL3', Ente.Tel_3);
        body.set('FECINI', Ente.Fec_Inicio);
        //body.set('SOLVEN', Ente.);
        body.set('CAP', Ente.Ban_Paral.toString());
        body.set('ACTI', Ente.Ban_Activ.toString());
        body.set('PROV', Ente.Ban_PvRec.toString());
        body.set('PROP', Ente.Ban_ProRe.toString());
        body.set('CTER', Ente.Ban_CtaTe.toString());
        body.set('HOGAR', Ente.Num_Lirpe.toString());
        return this.http.post(this.myApi, body.toString(), this.options);
    }
    
    public Validacion(Ente: EnteModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'Valida');
        body.set('RFC', Ente.RFC);
        body.set('CURP', Ente.CURP);
        body.set('NOM1', Ente.Nom_Ente1);
        body.set('NOM2', Ente.Nom_Ente2);
        body.set('APE1', Ente.Ape_Ente1);
        body.set('APE2', Ente.Ape_Ente2);
        body.set('NOMCOM', Ente.Nom_Com);
        body.set('FECHANAC', Ente.Fec_Nac);
        body.set('CVESEX', Ente.SexGen.Cve_TipSex);
        body.set('CVEPAIS', Ente.Pais.Paises[0].Cve_Pais.toString());
        body.set('CVELUGNA', Ente.Lugna.Cve_Lugna.toString());
        body.set('CVESUCUR', Ente.Sucur.Cve_Sucur.toString());
        body.set('CVECL', Ente.TipCl.Cve_TipCl.toString());
        
        return this.http.post(this.myApi, body.toString(), this.options);
    }

    
}