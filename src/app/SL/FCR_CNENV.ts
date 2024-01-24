import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { CnenvModel } from "../ML/FCR_CNENV";

@Injectable({
    providedIn: 'root'
})

export class CnenvService {
    myApi = "https://webmicfx.arashi.solutions/FCR/WsCnenv.p";

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

    GetCnenv(): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetAll().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<CnenvModel>();

                    let CneInicio = new CnenvModel();
                    CneInicio.Cve_Cnenv = null
                    CneInicio.Des_Cnenv = "------------ SELECCIONA UN CANAL DE ENVÍO --------------"

                    for (let index of this.imprimirdef) {
                        let CneMo = new CnenvModel()
                        CneMo.Cve_Cnenv = index.CVE_CNENV;
                        CneMo.Des_Cnenv = index.DES_CNENV;
                        result.Objects.push(CneMo)
                    }

                    //this.CnvenSelect = CneInicio
                    result.Objects.unshift(CneInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo canal de envío:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo canal de envío";
                observer.next(result);
                observer.complete();
            })
        })

    }





}