import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { EstadoModel } from "../ML/FGR_ESTDO";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { MunicModel } from "../ML/FGR_MUNIC";

@Injectable({
    providedIn: 'root'
})

export class MunicService {
    myApi = "https://webmicfx.arashi.solutions/FGR/WsMunic.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any
    constructor(private http: HttpClient) { }


    public GetAll(Estdo: EstadoModel): Observable<any> {
        let body = new URLSearchParams();
        body.set('CVEP', Estdo.Pais.Cve_Pais.toString());
        body.set('CVEE', Estdo.Cve_Estdo.toString());

        //body.set('ACCION', "ConDep");

        return this.http.post(this.myApi, body.toString(), this.options);

    }

    GetMunicipio(EdoProv: EstadoModel): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetAll(EdoProv).subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<MunicModel>()

                    let MunInicio = new MunicModel();
                    MunInicio.Cve_Munic = null
                    MunInicio.Nom_Munic = "------------ SELECCIONA UN MUNICIPIO --------------"

                    for (let index of this.imprimirdef) {
                        let MunicMod = new MunicModel()
                        MunicMod.Cve_Munic = index.CVE_MUNIC;
                        MunicMod.Nom_Munic = index.NOM_MUNIC;

                        result.Objects.push(MunicMod)
                    }
                    result.Correct = true;

                    //this.MunicSelect = MunInicio
                    //this.MunicSelectAc = MunInicio
                    //this.MunicSelectOp = MunInicio
                    result.Objects.unshift(MunInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }

                else {
                    result.Correct = false;
                    result.ErrorMessage = "Sin Municipios";
                }
            }, error => {
                console.error("Error obteniendo municipio:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo municipio";
                observer.next(result);
                observer.complete();
            })
        })

    }

    public GetMunicipioM(EdoProv: EstadoModel): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetAll(EdoProv).subscribe((r) => {

                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<MunicModel>()

                    let MunInicio = new MunicModel();
                    MunInicio.Cve_Munic = null
                    MunInicio.Nom_Munic = "------------ SELECCIONA UN MUNICIPIO --------------"

                    for (let index of this.imprimirdef) {
                        let MunicMod = new MunicModel()
                        MunicMod.Cve_Munic = index.CVE_MUNIC;
                        MunicMod.Nom_Munic = index.NOM_MUNIC;

                        result.Objects.push(MunicMod)
                    }

                    result.Correct = true;
                    result.Objects.unshift(MunInicio)

                    observer.next(result);
                    observer.complete();

                }

                else {
                    result.Correct = false;
                    result.ErrorMessage = "Sin Municipios";
                }

            }, error => {
                console.error("Error obteniendo municipioM:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo municipioM";
                observer.next(result);
                observer.complete();
            })
        })

    }
}