import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { MunicModel } from "../ML/FGR_MUNIC";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { FldLocalModel } from "../ML/FLD_LOCAL";

@Injectable({
    providedIn: 'root'
})

export class LocalCNBService {
    myApi = "https://webmicfx.arashi.solutions/FLD/WsLocalidadCNB.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any
    constructor(private http: HttpClient) { }


    public GetAll(Munic: MunicModel): Observable<any> {
        let body = new URLSearchParams();
        body.set('CVEP', Munic.Pais.Cve_Pais.toString());
        body.set('CVEE', Munic.Estado.Cve_Estdo.toString());
        body.set('CVEM', Munic.Cve_Munic.toString());

        //body.set('ACCION', "ConDep");

        return this.http.post(this.myApi, body.toString(), this.options);

    }

    GetLocalidadCNB(MunicCons: MunicModel): Observable<Result> {
        let result = new Result();

        return new Observable(observer => {
            this.GetAll(MunicCons).subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<FldLocalModel>()

                    let LocalCNBInicio = new FldLocalModel()
                    LocalCNBInicio.Cve_LoPLD = null
                    LocalCNBInicio.Des_LoPLD = "------------ SELECCIONA UNA LOCALIDAD --------------"

                    for (let index of this.imprimirdef) {
                        let LocCNBMo = new FldLocalModel()
                        LocCNBMo.Cve_LoPLD = index.CVE_LOCAL;
                        LocCNBMo.Des_LoPLD = index.DES_LOCAL;
                        result.Objects.push(LocCNBMo)
                    }

                    result.Correct = true;
                    // this.LocalCNBSelect = LocalCNBInicio
                    result.Objects.unshift(LocalCNBInicio)
                    observer.next(result);
                    observer.complete();

                }
                else {
                    result.Correct = false;
                }
                
            }, error => {
                console.error("Error obteniendo localidad:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo localidad";
                observer.next(result);
                observer.complete();
            })
        })
    }
}