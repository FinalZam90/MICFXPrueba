import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { EnteModel } from "../ML/FCL_ENTE";
import { DirecModel } from "../ML/FCL_DIREC";
import { Result } from "../ML/Result";
import { EstuModel } from "../ML/NivEstu";
import { CivModel } from "../ML/EdoCiv";
import { IngreModel } from "../ML/NivIngreso";
import { GrusoModel } from "../ML/FCL_GRUSO";
import { AegenModel } from "../ML/FCR_AEGEN";


@Injectable({
    providedIn: 'root'
})

export class EnteService {
    myApi = "https://webmicfx.arashi.solutions/FCL/WsEnte.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any
    public ente: EnteModel


    constructor(private http: HttpClient) { }


    public GetAll(): Observable<any> {
        let body = new URLSearchParams();
        body.set('ACCION', 'ConTodos');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");

        return this.http.post(this.myApi, body.toString(), this.options);
    }

    // ESTADO CIVIL
    GetEdoCiv(): Observable<any> {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetEdoCiv');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");

        return this.http.post(this.myApi, body.toString(), this.options);
    }
    GetEdoCi(contador: number, EdoCivSelect: CivModel): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetEdoCiv().subscribe((r) => {

                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<CivModel>();

                    let CivInicio = new CivModel();
                    CivInicio.Cve_EdoCi = null
                    CivInicio.Tip_EdoCi = "------------ SELECCIONA UN ESTADO CIVIL --------------"

                    if (contador > 0) {
                        CivInicio = EdoCivSelect
                    }

                    for (let index of this.imprimirdef) {
                        let CivMo = new CivModel()
                        CivMo.Cve_EdoCi = index.CveTipEdoCi;
                        CivMo.Tip_EdoCi = index.TIP_EDOCI;

                        if (contador > 0) {

                            if (CivMo.Cve_EdoCi == CivInicio.Cve_EdoCi) {
                                result.Objects.push(CivMo)
                            }

                        } else {
                            result.Objects.push(CivMo)
                        }

                    }
                    result.Object = CivInicio
                    result.Objects.unshift(CivInicio)

                    result.Correct = true;
                    observer.next(result);
                    observer.complete();
                }

            }, error => {
                console.error("Error obteniendo estado civil:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo estado civil";
                observer.next(result);
                observer.complete();
            })
        })

    }

    //NIVEL DE ESTUDIOS
    GetNivEst(): Observable<any> {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetNivEstu');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");

        return this.http.post(this.myApi, body.toString(), this.options);
    }
    GetNives(contador: number, NivesSelect: EstuModel): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {

            this.GetNivEst().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<EstuModel>();

                    let NivInicio = new EstuModel();
                    NivInicio.Cve_Nives = null
                    NivInicio.Des_Nives = "------------ SELECCIONA UN NIVEL --------------"

                    if (contador > 0) {
                        NivInicio = NivesSelect
                    }

                    for (let index of this.imprimirdef) {
                        let NivMo = new EstuModel()
                        NivMo.Cve_Nives = index.CVE_NIVES;
                        NivMo.Des_Nives = index.DES_NIVES;

                        if (contador > 0) {
                            if (NivMo.Cve_Nives != NivInicio.Cve_Nives) {
                                result.Objects.push(NivMo)
                            }
                        }

                        else {
                            result.Objects.push(NivMo)
                        }

                    }

                    result.Object = NivInicio
                    result.Objects.unshift(NivInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }
            },
                error => {
                    console.error("Error obteniendo nivel de estudio:", error);
                    result.Correct = false;
                    result.ErrorMessage = "Error obteniendo nivel de estudio";
                    observer.next(result);
                    observer.complete();
                })
        })

    }

    //NIVEL DE INGRESO
    GetNivIng(): Observable<any> {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetNivIng');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");
        return this.http.post(this.myApi, body.toString(), this.options);
    }
    GetNivIngOb(): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetNivIng().subscribe((r) => {

                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<IngreModel>();
                    let IngInicio = new IngreModel();

                    IngInicio.Des_Nivel = "------------ SELECCIONA UN NIVEL --------------"

                    for (let index of this.imprimirdef) {
                        let IngMo = new IngreModel()
                        IngMo.Des_Nivel = index.DesNivPD;
                        result.Objects.push(IngMo)
                    }

                    result.Object = IngInicio
                    result.Objects.unshift(IngInicio)

                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo nivel de ingreso:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo nivel de ingreso";
                observer.next(result);
                observer.complete();
            })
        })
    }

    GetGruso(): Observable<any> {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetGruso');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");

        return this.http.post(this.myApi, body.toString(), this.options);

    }
    GetGrusoOb(): Observable<Result> {

        let result = new Result()
        return new Observable(observer => {

            this.GetGruso().subscribe((r) => {

                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<GrusoModel>();

                    let GruInicio = new GrusoModel();
                    GruInicio.Cve_Gruso = null
                    GruInicio.Des_Gruso = "------------ SELECCIONA UN GRUPO --------------"

                    for (let index of this.imprimirdef) {
                        let GruMo = new GrusoModel()
                        GruMo.Cve_Gruso = index.CVE_GRUSO
                        GruMo.Des_Gruso = index.DES_GRUSO;
                        result.Objects.push(GruMo)
                    }

                    result.Object = GruInicio
                    result.Objects.unshift(GruInicio);
                    result.Correct = true;

                    observer.next(result);
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo grupo social:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo grupo social";
                observer.next(result);
                observer.complete();
            })
        })

    }

    // CNB
    GetCNB(): Observable<any> {
        let body = new URLSearchParams();
        body.set('ACCION', 'GetCNB');
        /*
        body.set('FECHA', '');
        body.set('ORACS', '');
        */
        //body.set('ACCION', "ConDep");

        return this.http.post(this.myApi, body.toString(), this.options);
    }
    GetAegen(): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {
            this.GetCNB().subscribe((r) => {
                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<AegenModel>();

                    let AeInicio = new AegenModel();
                    AeInicio.Cve_Aegen = null
                    AeInicio.Des_Aegen = "------------ SELECCIONA UN GRUPO --------------"

                    for (let index of this.imprimirdef) {
                        let AeMo = new AegenModel()
                        AeMo.Cve_Aegen = index.CVE_AEGEN
                        AeMo.Des_Aegen = index.DES_AEGEN;
                        result.Objects.push(AeMo)
                    }
                    result.Object = AeInicio
                    result.Objects.unshift(AeInicio)
                    result.Correct = true;

                    observer.next(result);
                    observer.complete()
                }
            }, error => {
                console.error("Error obteniendo CNB:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo CNB";
                observer.next(result);
                observer.complete();
            })
        })

    }

    public MaPaso3(Ente: EnteModel, Direc: DirecModel) {
        let body = new URLSearchParams();
        body.set('ACCION', 'ManDirec');
        body.set('NUM', Ente.Num_Ente.toString());
        body.set('CP', Direc.Cve_CP.toString());
        body.set('MUNIC', Direc.Municipio.Cve_Munic.toString());
        body.set('NUMEXT', Direc.Num_Ext.toString());
        body.set('VIVI', Direc.Vivienda.Cve_Tidom.toString());
        body.set('PAIS', Direc.Pais.Cve_Pais.toString());
        body.set('LOCAL', Direc.Localidad.Cve_Local.toString());
        body.set('NUMINT', Direc.Num_Int.toString());
        body.set('RESEN', Direc.Num_Resen.toString());
        body.set('EDO', Direc.Estado.Cve_Estdo.toString());
        body.set('CNB', Direc.LocalCNB.Cve_LoPLD.toString());
        body.set('APPOS', Direc.Num_Appos.toString());
        body.set('CIUDAD', Direc.Des_Ciuda);
        body.set('COL', Direc.Nom_Colon);
        body.set('CALLE', Direc.Des_Calle);

        return this.http.post(this.myApi, body.toString(), this.options);
    }
    public MaPaso2(Ente: EnteModel) {
        let body = new URLSearchParams();
        body.set('ACCION', 'ManClie2');
        body.set('NUM', Ente.Num_Ente.toString())
        body.set('NIVES', Ente.Nives.Cve_Nives.toString());
        body.set('EDOCI', Ente.EdoCi.Tip_EdoCi);
        body.set('CNB', Ente.Aegen.Cve_Aegen.toString());
        body.set('ING', Ente.Ingr.Des_Nivel);
        body.set('ECO', Ente.Gruso.Cve_Gruso.toString());
        body.set('EMAIL', Ente.Email);
        body.set('DEP', Ente.NumDependientes.toString());
        body.set('TEL1', Ente.Tel_1);
        body.set('TEL2', Ente.Tel_2);
        body.set('TEL3', Ente.Tel_3);
        body.set('FECINI', Ente.Fec_Inicio);
        //body.set('SOLVEN', Ente.);
        body.set('CAP', Ente.Ban_Paral.toString());
        body.set('ACTI', Ente.Ban_Activ.toString());
        body.set('PROV', Ente.Ban_PvRec.toString());
        body.set('PROP', Ente.Ban_ProRe.toString());
        body.set('CTER', Ente.Ban_CtaTe.toString());
        body.set('HOGAR', Ente.Num_Lirpe.toString());
        return this.http.post(this.myApi, body.toString(), this.options);
    }

    public Validacion(Ente: EnteModel) {
        let body = new URLSearchParams();
        body.set('ACCION', 'Valida');
        body.set('RFC', Ente.RFC);
        body.set('CURP', Ente.CURP);
        body.set('NOM1', Ente.Nom_Ente1);
        body.set('NOM2', Ente.Nom_Ente2);
        body.set('APE1', Ente.Ape_Ente1);
        body.set('APE2', Ente.Ape_Ente2);
        body.set('NOMCOM', Ente.Nom_Com);
        body.set('FECHANAC', Ente.Fec_Nac);
        body.set('CVESEX', Ente.SexGen.Cve_TipSex);
        body.set('CVEPAIS', Ente.Pais.Paises[0].Cve_Pais.toString());
        body.set('CVELUGNA', Ente.Lugna.Cve_Lugna.toString());
        body.set('CVESUCUR', Ente.Sucur.Cve_Sucur.toString());
        body.set('CVECL', Ente.TipCl.Cve_TipCl.toString());

        return this.http.post(this.myApi, body.toString(), this.options);
    }


}