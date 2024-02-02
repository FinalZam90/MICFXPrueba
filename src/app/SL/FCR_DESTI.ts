import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { DestiModel } from "../ML/FCR_DESTI";

@Injectable({
    providedIn: 'root'
})

export class DestiService {
    myApi = "https://webmicfx.arashi.solutions/FCR/WsDesti.p";

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


    GetDesti(): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetAll().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<DestiModel>();

                    let DestInicio = new DestiModel();
                    DestInicio.Cve_Desti = null
                    DestInicio.Des_Desti = "------------ SELECCIONA UNA APLICACIÓN DE RECURSOS --------------"

                    for (let index of this.imprimirdef) {
                        let DestMo = new DestiModel()
                        DestMo.Cve_Desti = index.CVE_DESTI;
                        DestMo.Des_Desti = index.DES_DESTI;
                        result.Objects.push(DestMo);

                    }
                    result.Object = DestInicio
                    result.Objects.unshift(DestInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo aplicacion de recursos:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo aplicacion de recursos";
                observer.next(result);
                observer.complete();
            })
        })

    }



}