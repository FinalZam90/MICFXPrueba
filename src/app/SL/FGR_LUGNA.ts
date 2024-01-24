import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { LugnaModel } from "../ML/FGR_LUGNA";
import { Result } from "../ML/Result";
//import { error } from "console";

@Injectable({
    providedIn: 'root'
})

export class LugnaService {
    myApi = "https://webmicfx.arashi.solutions/FGR/WsConLugna.p";

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

    GetLugna(contador: number, LugnaSelect: LugnaModel): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetAll().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<LugnaModel>();

                    let LugInicio = new LugnaModel();
                    LugInicio.Cve_Lugna = 0
                    LugInicio.Des_Lugna = "------------ SELECCIONA UN LUGAR DE NACIMIENTO --------------"

                    if (contador > 0) {
                        LugInicio = LugnaSelect
                    }
                    for (let index of this.imprimirdef) {
                        let LugMo = new LugnaModel()
                        LugMo.Cve_Lugna = index.CVE_LUGNA;
                        LugMo.Des_Lugna = index.DES_LUGNA;
                        
                        if (contador > 0) {
                            if (LugMo.Cve_Lugna != LugInicio.Cve_Lugna) {
                                result.Objects.push(LugMo)
                            }
                        }
                        else {
                            result.Objects.push(LugMo)
                        }
                    }
                    //this.LugnaSelect = LugInicio
                    result.Objects.unshift(LugInicio);
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo lugar nacimiento:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo lugar nacimiento";
                observer.next(result);
                observer.complete();
            })
        })

    }
}