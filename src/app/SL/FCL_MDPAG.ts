import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { EnteModel } from "../ML/FCL_ENTE";
import { DirecModel } from "../ML/FCL_DIREC";
import { MdPagModel } from "../ML/FCL_MDPAG";
@Injectable({
    providedIn: 'root'
})

export class MdPagService{
    myApi = "https://webmicfx.arashi.solutions/FCL/WsMdPag.p";

    options = 
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    constructor(private http:HttpClient){}
    
    public GetUtil(Md: MdPagModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetUti');
        body.set('PAGCV1', Md.Pagcu1.Cve.toString());
        body.set('PAGCV2', Md.Pagcu2.Cve.toString());
        body.set('PAGMO1', Md.Pagcu1.Sig.toString());
        body.set('PAGMO2', Md.Pagcu2.Sig.toString());
        body.set('MONGA', Md.Mon_Gasto.toString());
        return this.http.post(this.myApi, body.toString(), this.options)
    }
    
    public Add(Md : MdPagModel)
    {
        let body = new URLSearchParams();
        body.set('ACCION', 'Add');
        body.set('NUM', Md.Ente.Num_Ente.toString());
        body.set('FEC', Md.Fec_MdPag);
        body.set('CVEMD', Md.MdPag.Cve_Fopag.toString());
        body.set('PAGCV1', Md.Pagcu1.Cve.toString());
        body.set('PAGCV2', Md.Pagcu2.Cve.toString());
        body.set('PAGMO1', Md.Pagcu1.Sig.toString());
        body.set('PAGMO2', Md.Pagcu2.Sig.toString());
        body.set('MONGA', Md.Mon_Gasto.toString());
        body.set('MONPR', Md.Mon_PrePa.toString());
        body.set('MONLIQ', Md.Mon_LiqAn.toString());
        body.set('ESTDOP', Md.EstadoOp.Cve_Estdo.toString());
        body.set('MUNIOP', Md.MunicOp.Cve_Munic.toString());
        body.set('FUERC', Md.Fuerc.Cve_Fuerc.toString());
        body.set('APLRC', Md.AplRc.Cve_Desti.toString());
        body.set('ESTDAC', Md.EstadoAc.Cve_Estdo.toString());
        body.set('MUNIAC', Md.MunicAc.Cve_Munic.toString());
        body.set('CNENV', Md.Cnenv.Cve_Cnenv.toString());
        return this.http.post(this.myApi, body.toString(), this.options);
    }
    

    
}