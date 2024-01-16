import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
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

    constructor(
        private http: HttpClient,
        private TidoSer: TidomService,
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


    public GetVivienda(): Result {
        let result = new Result()

        this.TidoSer.GetAll().subscribe((r) => {
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
                // this.ViviendaSelect = VivInicio
                result.Objects.unshift(VivInicio)
            }
            else {
                result.Correct = false;
                result.ErrorMessage = "No hay tipo de vivienda existente."
            }
        })
        return result;
    }



}