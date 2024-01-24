import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { FuercModel } from "../ML/FGR_FUERC";

@Injectable({
    providedIn: 'root'
})

export class FuercService {
    myApi = "https://webmicfx.arashi.solutions/FGR/WsFuerc.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any
    constructor(private http: HttpClient) { }


    public GetAll(): Observable<any> {
        let body = new URLSearchParams();
        /*body.set('ACCION', 'Consul');
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");

        return this.http.get(this.myApi);

    }

    GetFuerc(): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetAll().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<FuercModel>();

                    let FuerInicio = new FuercModel();
                    FuerInicio.Cve_Fuerc = null
                    FuerInicio.Des_Fuerc = "------------ SELECCIONA UNA FUENTE DE RECURSOS --------------"

                    for (let index of this.imprimirdef) {
                        let FuerMo = new FuercModel()
                        FuerMo.Cve_Fuerc = index.CVE_FUERC;
                        FuerMo.Des_Fuerc = index.DES_FUERC;
                        result.Objects.push(FuerMo);
                    }

                    //this.FuercSelect = FuerInicio
                    result.Objects.unshift(FuerInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo fuente de recursos:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo fuente de recursos";
                observer.next(result);
                observer.complete();
            })
        })

    }

}