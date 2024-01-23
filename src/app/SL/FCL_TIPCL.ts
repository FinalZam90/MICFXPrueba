import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { TipClModel } from "../ML/FCL_TIPCL";

@Injectable({
    providedIn: 'root'
})

export class ClService {
    myApi = "https://webmicfx.arashi.solutions/FGR/WsConTipCl.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any

    constructor(
        private http: HttpClient
    ) { }


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

    GetTipCl(contador: number, ClienSelect: TipClModel): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetAll().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<TipClModel>();

                    let ClInicio = new TipClModel();
                    ClInicio.Cve_TipCl = null
                    ClInicio.Des_TipCl = "------------ SELECCIONA UN TIPO DE CLIENTE --------------"

                    if (contador > 0) {
                        ClInicio = ClienSelect
                    }

                    for (let index of this.imprimirdef) {
                        let ClMo = new TipClModel()

                        ClMo.Cve_TipCl = index.CVE_TIPCL;
                        ClMo.Des_TipCl = index.DES_TIPCL;

                        if (contador > 0) {
                            if (ClMo.Cve_TipCl != ClInicio.Cve_TipCl) {
                                result.Objects.push(ClMo)
                            }
                        }
                        else {
                            result.Objects.push(ClMo)
                        }
                    }

                    //this.ClienSelect = ClInicio
                    result.Objects.unshift(ClInicio)
                    result.Correct = true;

                    observer.next(result); // Emitir el resultado cuando la operación asíncrona se complete
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo sucursales:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo sucursales";
                observer.next(result);
                observer.complete();
            })
        });

    }


}