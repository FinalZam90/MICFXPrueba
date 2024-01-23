import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { EnteModel } from "../ML/FCL_ENTE";
import { DirecModel } from "../ML/FCL_DIREC";
import { RefmiModel } from "../ML/FCL_REFMI";
import { Result } from "../ML/Result";
@Injectable({
    providedIn: 'root'
})

export class RefmiService {
    myApi = "https://webmicfx.arashi.solutions/FCL/WsRefmi.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any
    constructor(private http: HttpClient) { }


    public GetAll(Refmi: RefmiModel): Observable<any> {
        Refmi.Ente.Num_Ente = 9732
        let body = new URLSearchParams();
        body.set('ACCION', 'GetById');
        body.set('NUM', Refmi.Ente.Num_Ente.toString());
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        this.http.get(this.myApi).subscribe((r) => { console.log(r) });
        return this.http.post(this.myApi, body.toString(), this.options);

    }
    public Add(Refmi: RefmiModel) {
        let body = new URLSearchParams();
        body.set('ACCION', 'Add');
        body.set('NUM', Refmi.Ente.Num_Ente.toString());
        body.set('ANCO', Refmi.Num_AnoCo.toString());
        body.set('CONT', Refmi.Contador.toString());
        body.set('RESP1', Refmi.Cve_Respr[0].toString());
        body.set('RESP2', Refmi.Cve_Respr[1].toString());
        body.set('RESP3', Refmi.Cve_Respr[2].toString());
        body.set('RESP4', Refmi.Cve_Respr[3].toString());
        body.set('NOM', Refmi.Nom_Refer);
        body.set('DIREC', Refmi.Des_Dirre);
        body.set('NUMTEL', Refmi.Num_TelRe);
        body.set('COMEN', Refmi.Des_Comen);



        return this.http.post(this.myApi, body.toString(), this.options);
    }

    GetRefmi(refmi: RefmiModel): Result {
        let result = new Result()

        this.GetAll(refmi).subscribe((r) => {
            this.imprimirdef = r;

            if (this.imprimirdef != null) {
                result.Objects = new Array<RefmiModel>()

                let RefmiInicio = new RefmiModel()

                for (let index of this.imprimirdef) {
                    for (let i = 0; i < 5; i++) {
                        let RefmiMo = new RefmiModel()
                        RefmiMo.Nom_Refer = index.NOM_REFER[i];
                        RefmiMo.Des_Dirre = index.DES_DIRRE[i];
                        RefmiMo.Num_TelRe = index.NUM_TELRE[i];
                        RefmiMo.Num_AnoCo = index.Num_AnoCo[i];
                        RefmiMo.Ban_Reco = index.BAN_Recom[i];
                        RefmiMo.Des_Comen = index.Des_Comen;
                        result.Objects.push(RefmiMo)
                    }
                }
                result.Correct = true;
            }
            else {
                result.Correct = false;
                result.ErrorMessage = "El cliente no tiene Referenciados."
            }
        })
        return result;
    }




}