import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { MunicModel } from "../ML/FGR_MUNIC";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { LocalModel } from "../ML/FGR_LOCAL";

@Injectable({
    providedIn: 'root'
})

export class LocalService {
    myApi = "https://webmicfx.arashi.solutions/FGR/WsLocalidad.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any
    constructor(private http: HttpClient) { }


    public GetAll(Munic: MunicModel): Observable<any> {
        let body = new URLSearchParams();
        body.set('CVEP', Munic.Pais.Cve_Pais.toString());
        body.set('CVEE', Munic.Estado.Cve_Estdo.toString());
        body.set('CVEM', Munic.Cve_Munic.toString());

        //body.set('ACCION', "ConDep");

        return this.http.post(this.myApi, body.toString(), this.options);

    }

    GetLocalidad(MuniProv: MunicModel): Observable<Result> {

        let result = new Result();
        return new Observable(observer => {
            this.GetAll(MuniProv).subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<LocalModel>()

                    let LocaInicio = new LocalModel();
                    LocaInicio.Cve_Local = null
                    LocaInicio.Nom_Local = "------------ SELECCIONA UNA LOCALIDAD --------------"

                    for (let index of this.imprimirdef) {
                        let LocalMo = new LocalModel()
                        LocalMo.Cve_Local = index.CVE_LOCAL;
                        LocalMo.Nom_Local = index.NOM_LOCAL;
                        result.Objects.push(LocalMo)
                    }

                    result.Object = LocaInicio
                    result.Objects.unshift(LocaInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }

                else {
                    result.Correct = false;
                }
            },
                error => {
                    console.error("Error obteniendo localidad:", error);
                    result.Correct = false;
                    result.ErrorMessage = "Error obteniendo localidad";
                    observer.next(result);
                    observer.complete();
                })
        })

    }

}