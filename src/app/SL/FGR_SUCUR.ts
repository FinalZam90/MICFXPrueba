import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable } from "rxjs";
import { Result } from "../ML/Result";
import { SucurModel } from "../ML/FGR_SUCUR";
import { EnteModel } from "../ML/FCL_ENTE";

@Injectable({
    providedIn: 'root'
})

export class SucurService implements OnInit {


    myApi = "https://webmicfx.arashi.solutions/FGR/WsSucur.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any
    public ente: EnteModel
    public contadorGuardadoSelectores: number;

    constructor(
        private http: HttpClient,
        private SucSer: SucurService,
    ) { }

    ngOnInit(): void {
        this.contadorGuardadoSelectores = 0;
    }

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

    GetSucurs(contadorGuardadoSelectores: number, SucurSelect: SucurModel): Result {
        let result = new Result()

        this.SucSer.GetAll().subscribe((r) => {

            this.imprimirdef = r;

            if (this.imprimirdef != null) {
                result.Objects = new Array<SucurModel>();

                let SucInicio = new SucurModel();
                SucInicio.Cve_Sucur = null
                SucInicio.Des_Sucur = "------------ SELECCIONA UNA SUCURSAL --------------"

                // Si le dio en el boton guardar, aplica en cualquier pestaña
                if (contadorGuardadoSelectores > 0) {
                    // Recibe información del usuario y formatea la data inicial
                    SucInicio.Cve_Sucur = SucurSelect.Cve_Sucur
                    SucInicio.Des_Sucur = SucurSelect.Des_Sucur
                }

                // LLenado de los datos del datalist
                // objeto como esta, array más de un registro
                for (let index of this.imprimirdef) {
                    //Crea objetos de sucurModel 
                    let SucMo = new SucurModel()
                    SucMo.Cve_Sucur = index.CVE_SUCUR;
                    SucMo.Des_Sucur = index.DES_SUCUR;

                    if (contadorGuardadoSelectores > 0) {
                        //Llena el formulario con la información anterior del usuario al dar guardar
                        if (SucInicio.Cve_Sucur != SucMo.Cve_Sucur) {
                            result.Objects.push(SucMo)
                        }
                    }
                    else {
                        result.Objects.push(SucMo)
                    }
                }

                //SucurSelect = SucInicio
                //Agrega al inicio de la lista el predeterminado
                result.Objects.unshift(SucInicio)
                //Si aprobó cambia bandera a correcto
                result.Correct = true;               
            }            
        });

        return result;
    }

}