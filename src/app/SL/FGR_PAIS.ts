import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { PaisModel } from "../ML/FGR_PAIS";

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

    constructor(
        private http: HttpClient,
        private PaiSer: PaisService,
    ) { }


    public GetAll(): Observable<any> {
        let body = new URLSearchParams();
        /*body.set('ACCION', 'Consul');
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");

        return this.http.get(this.myApi);
    }


    GetPais(contadorGuardadoSelectores: number, PaisSelect: PaisModel) {
        let result = new Result()

        this.PaiSer.GetAll().subscribe((r) => {

            this.imprimirdef = r;

            if (this.imprimirdef != null) {
                result.Objects = new Array<PaisModel>();

                let PaiInicio = new PaisModel();
                PaiInicio.Cve_Pais = null
                PaiInicio.Des_Nac = "------------ SELECCIONA UN PAIS --------------"

                if (contadorGuardadoSelectores > 0) {
                    PaiInicio = PaisSelect
                }

                for (let index of this.imprimirdef) {
                    let PaMo = new PaisModel()
                    PaMo.Cve_Pais = index.CVE_PAIS;
                    PaMo.Des_Nac = index.DES_CIVIL;
                    PaMo.Nom_Pais = index.NOM_PAIS;

                    if (contadorGuardadoSelectores > 0) {
                        if (PaiInicio.Cve_Pais != PaMo.Cve_Pais) {
                            result.Objects.push(PaMo)
                        }
                    }
                    else {
                        result.Objects.push(PaMo)
                    }
                }

                // this.PaisSelect = PaiInicio
                result.Objects.unshift(PaiInicio)            
                result.Correct = true;
            }
        })
        return result;
    }


}