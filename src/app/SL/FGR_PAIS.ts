import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable, observable } from 'rxjs';
import { PaisModel } from "../ML/FGR_PAIS";
import { Result } from "../ML/Result";


@Injectable({
    providedIn: 'root'
})

export class PaisService {
    myApi = "https://webmicfx.arashi.solutions/FGR/WsConPais.p";

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


    GetPais(contador: number, PaisSelect: PaisModel): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {

            this.GetAll().subscribe((r) => {

                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<PaisModel>();

                    let PaiInicio = new PaisModel();
                    PaiInicio.Cve_Pais = null
                    PaiInicio.Des_Nac = "------------ SELECCIONA UN PAIS --------------"

                    if (contador > 0) {
                        PaiInicio = PaisSelect
                    }

                    for (let index of this.imprimirdef) {
                        let PaMo = new PaisModel()
                        PaMo.Cve_Pais = index.CVE_PAIS;
                        PaMo.Des_Nac = index.DES_CIVIL;
                        PaMo.Nom_Pais = index.NOM_PAIS;

                        if (contador > 0) {
                            if (PaiInicio.Cve_Pais != PaMo.Cve_Pais) {
                                result.Objects.push(PaMo)
                            }
                        }
                        else {
                            result.Objects.push(PaMo)
                        }
                    }

                    result.Object = PaiInicio
                    result.Objects.unshift(PaiInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo país:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo país";
                observer.next(result);
                observer.complete();
            })
        })
    }




}