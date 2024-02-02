import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Movi1Model } from "../ML/MOVI1";
import { Observable, observable } from "rxjs";
import { Result } from "../ML/Result";
import { SucurModel } from "../ML/FGR_SUCUR";
//import { error } from "console";

@Injectable({
    providedIn: 'root'
})

export class SucurService {
    myApi = "https://webmicfx.arashi.solutions/FGR/WsSucur.p";

    options =
        {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        }

    public imprimirdef: any;

    constructor(private http: HttpClient) { }


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

    GetSucurs(contador: number, SucurSelect: SucurModel): Observable<Result> {
        let result = new Result()

        return new Observable(observer => {

            this.GetAll().subscribe((r) => {

                this.imprimirdef = r;

                if (this.imprimirdef != null) {
                    result.Objects = new Array<SucurModel>();

                    let SucInicio = new SucurModel();
                    SucInicio.Cve_Sucur = null
                    SucInicio.Des_Sucur = "------------ SELECCIONA UNA SUCURSAL --------------"

                    // Si le dio en el boton guardar, aplica en cualquier pestaña
                    if (contador > 0) {
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

                        if (contador > 0) {
                            //Llena el formulario con la información anterior del usuario al dar guardar
                            if (SucInicio.Cve_Sucur != SucMo.Cve_Sucur) {
                                result.Objects.push(SucMo)
                            }
                        }
                        else {
                            result.Objects.push(SucMo)
                        }
                    }

                    result.Object = SucInicio
                    //Agrega al inicio de la lista el predeterminado
                    result.Objects.unshift(SucInicio)
                    //Si aprobó cambia bandera a correcto
                    result.Correct = true;

                    observer.next(result); // Emitir el resultado cuando la operación asíncrona se complete
                    observer.complete();
                }
            }, error => {
                console.error("Error obteniendo sucursales:", error);
                result.Correct = false;
                result.ErrorMessage = "Error obteniendo sucursales";
                observer.next(result);
                observer.complete();
            });
        });
    }
}