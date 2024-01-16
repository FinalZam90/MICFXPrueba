import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { EnteModel } from "../ML/FCL_ENTE";
import { DirecModel } from "../ML/FCL_DIREC";
import { EntIdModel } from "../ML/FCL_ENTID";
import { Result } from "../ML/Result";
@Injectable({
    providedIn: 'root'
})

export class EntIdService {
    myApi = "https://webmicfx.arashi.solutions/FCL/WsIdenti.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any

    constructor(
        private http: HttpClient,
        private EntIdSer: EntIdService,
    ) { }


    public GetAll(EnteId: EntIdModel): Observable<any> {
        EnteId.Ente.Num_Ente = 9732
        let body = new URLSearchParams();
        body.set('ACCION', 'GetById');

        body.set('NUM', EnteId.Ente.Num_Ente.toString());

        return this.http.post(this.myApi, body.toString(), this.options);

    }
    public GetTipId(): Observable<any> {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetTip');


        return this.http.post(this.myApi, body.toString(), this.options);

    }
    public Add(EntId: EntIdModel) {
        let body = new URLSearchParams();
        body.set('ACCION', 'AddIdent');
        body.set('NUM', EntId.Ente.Num_Ente.toString());
        body.set('TIP', EntId.Cve_TipId.toString());
        body.set('VENCI', EntId.An_Venci.toString());
        body.set('NUMIDENT', EntId.Num_Identi.toString());
        body.set('FECHA', EntId.Fec_AddRec);
        body.set('IDENT', EntId.Cve_Identi);


        return this.http.post(this.myApi, body.toString(), this.options);
    }

    GetTipId2(): Result {
        let result = new Result()

        this.EntIdSer.GetTipId().subscribe((r) => {
            this.imprimirdef = r;

            if (this.imprimirdef != null) {
                result.Objects = new Array<EntIdModel>()
                let EntIdInicio = new EntIdModel()

                for (let index of this.imprimirdef) {
                    let EntIdMo = new EntIdModel()
                    EntIdMo.Cve_TipId = index.CVE_TIPID;
                    EntIdMo.Des_Identi = index.DES_TIPID;
                    result.Objects.push(EntIdMo)
                }

                result.Correct = true;
            }

            else {
                result.Correct = false;
                result.ErrorMessage = "No hay tipo de Identificación existente."
            }
        })
        return result;
    }

    GetIdenti(entid: EntIdModel): Result {
        let result = new Result()

        this.EntIdSer.GetAll(entid).subscribe((r) => {
            this.imprimirdef = r;

            if (this.imprimirdef != null) {
                result.Objects = new Array<EntIdModel>()

                let EntIdInicio = new EntIdModel()

                for (let index of this.imprimirdef) {
                    let EntIdMo = new EntIdModel()
                    EntIdMo.Fec_Venci = index.FEC_VENCI;
                    EntIdMo.Des_Identi = index.DES_TIPID;
                    EntIdMo.Fec_AddRec = index.FEC_ADDREC;
                    EntIdMo.Num_Identi = index.NUM_IDENTI;
                    EntIdMo.Cve_Identi = index.CVE_IDENT;
                    result.Objects.push(EntIdMo)
                }
                result.Correct = true;
            }

            else {
                result.Correct = false;
                result.ErrorMessage = "El cliente no tiene Identificación existente."
            }
        })
        return result;
    }


}