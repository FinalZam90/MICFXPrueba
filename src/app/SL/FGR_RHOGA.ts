import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { RhogaModel } from "../ML/FGR_RHOGA";


@Injectable({
    providedIn: 'root'
})

export class RhogaService {
    myApi = "https://webmicfx.arashi.solutions/FGR/WsRhoga.p";

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

    GetRhoga(): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetAll().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<RhogaModel>();

                    let RhogInicio = new RhogaModel();
                    RhogInicio.Cve_Rhoga = null
                    RhogInicio.Des_Rhoga = "------------ SELECCIONA UN ROL --------------"

                    for (let index of this.imprimirdef) {
                        let RhogMo = new RhogaModel()
                        RhogMo.Cve_Rhoga = index.CVE_RHOGA
                        RhogMo.Des_Rhoga = index.DES_RHOGA;
                        result.Objects.push(RhogMo)
                    }

                    //this.RhogaSelect = RhogInicio
                    result.Objects.unshift(RhogInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo rol hogar:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo rol hogar";
                observer.next(result);
                observer.complete();
            })
        })

    }

}