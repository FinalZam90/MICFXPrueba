import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { EstadoModel } from "../ML/FGR_ESTDO";

@Injectable({
    providedIn: 'root'
})

export class EstadoService {
    myApi = "https://webmicfx.arashi.solutions/FGR/WsEdo.p";

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

    GetEstado(): Observable<Result> {
        let result = new Result();

        return new Observable(observer => {
            this.GetAll().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<EstadoModel>();

                    let EdoInicio = new EstadoModel();
                    EdoInicio.Cve_Estdo = null
                    EdoInicio.Nom_Estdo = "------------ SELECCIONA UN ESTADO --------------"

                    for (let index of this.imprimirdef) {
                        let EdoMod = new EstadoModel()
                        EdoMod.Cve_Estdo = index.CVE_ESTDO;
                        EdoMod.Nom_Estdo = index.NOM_ESTDO;
                        EdoMod.Nom_Abrev = index.NOM_ABREV;
                        result.Objects.push(EdoMod)
                    }

                    result.Object = EdoInicio
                    //this.EstadoSelectOp = EdoInicio
                    //this.EstadoSelectAc = EdoInicio
                    result.Objects.unshift(EdoInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }

                else {
                    result.Correct = false;
                    result.ErrorMessage = "Sin Estados";
                }

            }, error => {
                console.error("Error obteniendo estado:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo estado";
                observer.next(result);
                observer.complete();
             })
        })

    }



}