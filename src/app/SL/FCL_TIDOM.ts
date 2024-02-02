import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable, observable } from "rxjs";
import { Result } from "../ML/Result";
import { TidoModel } from "../ML/FCL_TIDOM";

@Injectable({
    providedIn: 'root'
})

export class TidomService {
    myApi = "https://webmicfx.arashi.solutions/FCL/WsTidom.p";

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
        this.http.get(this.myApi).subscribe((r) => { console.log(r) });
        return this.http.get(this.myApi);

    }

    public GetVivienda(): Observable<Result> {
        let result = new Result();

        return new Observable(observer => {
            this.GetAll().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<TidoModel>()

                    let VivInicio = new TidoModel()
                    VivInicio.Cve_Tidom = null
                    VivInicio.Des_Tidom = "------------ SELECCIONA UNA VIVIENDA --------------"

                    for (let index of this.imprimirdef) {
                        let TidoMo = new TidoModel()
                        TidoMo.Cve_Tidom = index.CVE_TIDOM;
                        TidoMo.Des_Tidom = index.DES_TIDOM;
                        result.Objects.push(TidoMo)
                    }

                    result.Correct = true;
                    result.Object = VivInicio
                    result.Objects.unshift(VivInicio)

                    observer.next(result);
                    observer.complete();
                }
                else {
                    result.Correct = false;
                    result.ErrorMessage = "No hay tipo de vivienda existente."
                }
            }, error => {
                console.error("Error obteniendo vivienda:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo vivienda";
                observer.next(result);
                observer.complete();
            })
        })
    }

}