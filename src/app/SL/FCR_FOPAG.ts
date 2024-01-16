import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { FopagModel } from "../ML/FCR_FOPAG";

@Injectable({
    providedIn: 'root'
})

export class FopagService {
    myApi = "https://webmicfx.arashi.solutions/FCR/WsFopag.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }
    public imprimirdef: any

    constructor(
        private http: HttpClient,
        private FopSer: FopagService,
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

    GetFopag(): Result {
        let result = new Result()

        this.FopSer.GetAll().subscribe((r) => {
            this.imprimirdef = r;

            if (this.imprimirdef != null) {
                result.Objects = new Array<FopagModel>();

                let FopaInicio = new FopagModel();
                FopaInicio.Cve_Fopag = null
                FopaInicio.Nom_Fopag = "------------ SELECCIONA UN INSTR. --------------"

                for (let index of this.imprimirdef) {
                    let FopMo = new FopagModel()
                    FopMo.Cve_Fopag = index.CVE_FOPAG;
                    FopMo.Nom_Fopag = index.NOM_FOPAG;
                    result.Objects.push(FopMo);
                }

                //this.FopaSelect = FopaInicio
                result.Objects.unshift(FopaInicio)
                result.Correct = true;
            }
        })
        return result;
    }

}